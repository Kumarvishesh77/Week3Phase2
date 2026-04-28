document.addEventListener('DOMContentLoaded', () => {
    // State management
    let currentProfile = null;
    let isEditMode = false;

    // UI Elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const editToggleBtns = document.querySelectorAll('.edit-toggle-btn');
    const globalFormActions = document.getElementById('globalFormActions');
    const saveChangesBtn = document.getElementById('saveChangesBtn');
    const cancelChangesBtn = document.getElementById('cancelChangesBtn');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // --- Tab Switching ---
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // --- Edit Mode Toggle ---
    const setEditMode = (enabled) => {
        isEditMode = enabled;
        const inputs = document.querySelectorAll('.profile-form input:not(.readonly-field), .profile-form select:not(.readonly-field), .profile-form textarea:not(.readonly-field)');
        
        inputs.forEach(input => {
            input.disabled = !enabled;
        });

        if (enabled) {
            globalFormActions.classList.remove('hidden');
        } else {
            globalFormActions.classList.add('hidden');
        }
    };

    editToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => setEditMode(true));
    });

    cancelChangesBtn.addEventListener('click', () => {
        renderProfile(currentProfile); // Revert to original data
        setEditMode(false);
    });

    // --- Fetch Profile Data ---
    const fetchProfile = async () => {
        try {
            const response = await fetch('/api/profile/me');
            const result = await response.json();
            
            if (result.success) {
                currentProfile = result.data;
                renderProfile(currentProfile);
            } else {
                showToast(result.message || 'Failed to load profile', 'danger');
                if (response.status === 401) {
                    window.location.href = 'index.html'; // Redirect to login
                }
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            showToast('Network error while loading profile', 'danger');
        }
    };

    // --- Render Profile to UI ---
    const renderProfile = (profile) => {
        if (!profile) return;

        // 1. Sidebar Identity
        document.getElementById('sidebarFullName').textContent = profile.userId.fullname;
        document.getElementById('sidebarRole').textContent = profile.jobTitle || 'Role not set';
        document.getElementById('profileAvatar').src = profile.avatar || '/profileplaceHolder.jfif';
        document.getElementById('profileStatusBadge').textContent = profile.profileStatus;
        document.getElementById('profileStatusBadge').className = `badge ${profile.profileStatus.toLowerCase()}`;

        // 2. Header
        document.getElementById('headerUserName').textContent = profile.userId.fullname;
        document.getElementById('headerAvatar').src = profile.avatar || '/profileplaceHolder.jfif';

        // 3. Completion Tracker
        const percentage = profile.completionPercentage || 0;
        document.getElementById('completionText').textContent = `${percentage}%`;
        document.getElementById('completionCircle').style.strokeDasharray = `${percentage}, 100`;
        renderNextSteps(profile);

        // 4. Populate Forms
        populateForm('basicInfoForm', { ...profile, ...profile.userId });
        populateForm('professionalForm', profile);
        populateForm('settingsForm', profile);

        // 5. System Info
        document.getElementById('sysUserId').textContent = profile.userId.username;
        document.getElementById('sysCreatedDate').textContent = new Date(profile.userId.createdAt).toLocaleDateString();
        document.getElementById('sysUpdatedDate').textContent = new Date(profile.lastProfileUpdated).toLocaleDateString();
        document.getElementById('sysUserRole').textContent = profile.userId.role.charAt(0).toUpperCase() + profile.userId.role.slice(1);

        // 6. Skills Tags
        renderSkills(profile.skills);

        // 7. Compliance
        document.getElementById('complianceBgStatus').textContent = profile.backgroundVerificationStatus;
    };

    const populateForm = (formId, data) => {
        const form = document.getElementById(formId);
        if (!form) return;

        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            const name = input.getAttribute('name');
            if (data[name] !== undefined) {
                if (input.type === 'date' && data[name]) {
                    input.value = new Date(data[name]).toISOString().split('T')[0];
                } else {
                    input.value = data[name];
                }
            }
        });
    };

    const renderSkills = (skills) => {
        const container = document.getElementById('skillsTags');
        container.innerHTML = '';
        if (skills && skills.length > 0) {
            skills.forEach(skill => {
                const tag = document.createElement('div');
                tag.className = 'tag';
                tag.innerHTML = `${skill} <i class="fas fa-times" onclick="removeSkill('${skill}')"></i>`;
                container.appendChild(tag);
            });
        }
    };

    const renderNextSteps = (profile) => {
        const list = document.getElementById('nextStepsList');
        list.innerHTML = '';
        const steps = [];
        
        if (!profile.dob) steps.push('Add Date of Birth');
        if (!profile.jobTitle) steps.push('Set your Job Title');
        if (!profile.mobileNumber) steps.push('Verify Mobile Number');
        if (!profile.skills || profile.skills.length === 0) steps.push('Add your Skills');

        steps.forEach(step => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${step}`;
            list.appendChild(li);
        });
        
        if (steps.length === 0) {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check-circle" style="color:var(--success-color)"></i> Profile is complete!`;
            list.appendChild(li);
        }
    };

    // --- Save Changes ---
    saveChangesBtn.addEventListener('click', async () => {
        const basicData = getFormData('basicInfoForm');
        const professionalData = getFormData('professionalForm');
        const settingsData = getFormData('settingsForm');

        const combinedUpdates = { ...basicData, ...professionalData, ...settingsData };

        try {
            const response = await fetch('/api/profile/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(combinedUpdates)
            });

            const result = await response.json();
            if (result.success) {
                currentProfile = result.data;
                renderProfile(currentProfile);
                setEditMode(false);
                showToast('Profile updated successfully!', 'success');
            } else {
                showToast(result.message || 'Update failed', 'danger');
            }
        } catch (error) {
            showToast('Network error during update', 'danger');
        }
    });

    const getFormData = (formId) => {
        const form = document.getElementById(formId);
        const data = {};
        const inputs = form.querySelectorAll('input:not(:disabled), select:not(:disabled), textarea:not(:disabled)');
        inputs.forEach(input => {
            if (input.name) data[input.name] = input.value;
        });
        return data;
    };

    // --- Utils ---
    const showToast = (message, type = 'primary') => {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i> <span>${message}</span>`;
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    };

    // Initial load
    fetchProfile();

    // --- Skill Management ---
    const skillInput = document.getElementById('skillInput');
    if (skillInput) {
        skillInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter' && skillInput.value.trim() !== '') {
                const newSkill = skillInput.value.trim();
                if (!currentProfile.skills.includes(newSkill)) {
                    const updatedSkills = [...currentProfile.skills, newSkill];
                    await updateProfileField({ skills: updatedSkills });
                }
                skillInput.value = '';
            }
        });
    }

    window.removeSkill = async (skillToRemove) => {
        const updatedSkills = currentProfile.skills.filter(s => s !== skillToRemove);
        await updateProfileField({ skills: updatedSkills });
    };

    const updateProfileField = async (update) => {
        try {
            const response = await fetch('/api/profile/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(update)
            });
            const result = await response.json();
            if (result.success) {
                currentProfile = result.data;
                renderProfile(currentProfile);
                showToast('Skills updated', 'success');
            }
        } catch (error) {
            showToast('Failed to update skills', 'danger');
        }
    };

    // Dark Mode Toggle logic
