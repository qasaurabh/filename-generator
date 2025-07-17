// --- Attachment Filename Generation Functionality ---
// Generate filename like: 07-14-25-iOS-VoiceOver-focus-moves-to-hidden-elements
function generateAttachmentFilename(title, platform, screenReader) {
    // Get current date in MM-DD-YYYY format
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const yyyy = String(now.getFullYear());
    // Replace spaces and special chars in title with hyphens
    const cleanTitle = title.trim().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    // Compose filename (status will be prepended by UI logic)
    return `${mm}-${dd}-${yyyy}-${platform}-${screenReader}-${cleanTitle}`;
}

// UI: Add fields and button for filename generation (call this after DOMContentLoaded)
function setupAttachmentFilenameUI() {
    const filenameSection = document.getElementById('attachmentFilenameGenerator');
    if (!filenameSection) return;

    const container = document.createElement('div');
    container.className = 'attachment-filename-ui cool-glass-form';
    container.innerHTML = `
        <h1><i class='fas fa-file-alt' style='margin-right:0.5rem;color:#6366f1;'></i>Generate Attachment Filename</h1>
        <div style="display:flex;flex-direction:column;gap:0.75rem;">
            <label for="attachmentStatus">Status</label>
            <select id="attachmentStatus">
                <option value="" selected disabled>Select status</option>
                <option value="Fixed">Fixed</option>
                <option value="NotFixed">NotFixed</option>
                <option value="Failed">Failed</option>
                <option value="Figma">Figma</option>
                <option value="Reference">Reference</option>
                <option value="Other">Other</option>
            </select>
            <div id="statusError" class="error-message" style="display:none;color:#d93025;font-size:0.875rem;font-weight:400;margin-top:0.05rem;margin-bottom:1.5rem;padding:0;line-height:1.3;" role="alert" aria-live="polite">
                <i class="fas fa-exclamation-circle" style="margin-right:0.375rem;font-size:0.875rem;"></i>
            </div>
            
            <label for="attachmentTitle">Title</label>
            <div style="position:relative;display:flex;align-items:center;width:100%;">
                <input type="text" id="attachmentTitle" placeholder="Describe the issue (e.g., VoiceOver focus moves to hidden elements)" />
                <button id="clearAttachmentTitleBtn" title="Clear" aria-label="Clear title" style="position:absolute;right:0.5rem;top:35%;transform:translateY(-50%);height:2rem;width:2rem;padding:0;border-radius:50%;background:transparent;color:#6b7280;border:none;font-size:1.15rem;cursor:pointer;transition:background 0.2s,color 0.2s,box-shadow 0.2s;outline:none;display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;pointer-events:none;">
                    <i class="fas fa-times" style="pointer-events:none;font-size:1.15rem;"></i>
                </button>
            </div>
            <div id="titleError" class="error-message" style="display:none;color:#d93025;font-size:0.875rem;font-weight:400;margin-top:0.25rem;margin-bottom:1.5rem;padding:0;line-height:1.3;" role="alert" aria-live="polite">
                <i class="fas fa-exclamation-circle" style="margin-right:0.375rem;font-size:0.875rem;"></i>
            </div>
            
            <label for="attachmentPlatform">Platform</label>
            <select id="attachmentPlatform">
                <option value="" selected disabled>Select platform</option>
                <option value="iOS">iOS</option>
                <option value="Android">Android</option>
                <option value="Web">Web</option>
                <option value="Windows">Windows</option>
                <option value="macOS">macOS</option>
                <option value="Other">Other</option>
            </select>
            <div id="platformError" class="error-message" style="display:none;color:#d93025;font-size:0.875rem;font-weight:400;margin-top:0.25rem;margin-bottom:1.5rem;padding:0;line-height:1.3;" role="alert" aria-live="polite">
                <i class="fas fa-exclamation-circle" style="margin-right:0.375rem;font-size:0.875rem;"></i>
            </div>
            <div style="display:flex;gap:0.75rem;align-items:center;margin-top:1.5rem;">
                <button id="generateFilenameBtn" class="btn btn-primary" style="flex:1;margin-top:0;">Generate Filename</button>
                <button id="refreshFormBtn" class="btn btn-secondary" title="Refresh Form" aria-label="Refresh form and clear all fields">
                    <i class="fas fa-refresh" style="font-size:1rem;"></i>
                </button>
            </div>
            <div id="generatedFilename" style="margin-top:0.75rem;display:flex;align-items:center;gap:1rem;"></div>
        </div>
    `;
    filenameSection.appendChild(container);

    const clearBtn = container.querySelector('#clearAttachmentTitleBtn');
    const titleInput = container.querySelector('#attachmentTitle');
    
    // Helper function to show/hide error messages
    function showError(errorId, message) {
        const errorElement = container.querySelector(`#${errorId}`);
        const fieldId = errorId.replace('Error', '');
        const fieldElement = container.querySelector(`#attachment${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)}`);
        
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle" style="margin-right:0.375rem;font-size:0.875rem;"></i>${message}`;
        errorElement.style.display = 'block';
        
        // Add ARIA attributes for accessibility and Google-style red border
        if (fieldElement) {
            fieldElement.setAttribute('aria-invalid', 'true');
            fieldElement.setAttribute('aria-describedby', errorId);
            fieldElement.style.borderColor = '#d93025';
            fieldElement.style.borderWidth = '2px';
            fieldElement.style.outline = 'none';
            // Remove bottom margin from field when error appears
            fieldElement.style.marginBottom = '0';
        }
    }
    
    function hideError(errorId) {
        const errorElement = container.querySelector(`#${errorId}`);
        const fieldId = errorId.replace('Error', '');
        const fieldElement = container.querySelector(`#attachment${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)}`);
        
        errorElement.style.display = 'none';
        
        // Remove ARIA attributes and reset border
        if (fieldElement) {
            fieldElement.removeAttribute('aria-invalid');
            fieldElement.removeAttribute('aria-describedby');
            fieldElement.style.borderColor = '';
            fieldElement.style.borderWidth = '';
            fieldElement.style.outline = '';
            // Restore bottom margin to field when error is hidden
            fieldElement.style.marginBottom = '';
        }
    }
    
    function hideAllErrors() {
        hideError('statusError');
        hideError('titleError');
        hideError('platformError');
    }
    
    function updateClearBtnVisibility() {
        if (titleInput.value.trim().length > 0) {
            clearBtn.style.visibility = 'visible';
            clearBtn.style.opacity = '1';
            clearBtn.style.pointerEvents = 'auto';
        } else {
            clearBtn.style.visibility = 'hidden';
            clearBtn.style.opacity = '0';
            clearBtn.style.pointerEvents = 'none';
        }
    }
    updateClearBtnVisibility();
    titleInput.addEventListener('input', updateClearBtnVisibility);
    
    // Add real-time validation clearing
    container.querySelector('#attachmentStatus').addEventListener('change', function() {
        if (this.value) hideError('statusError');
    });
    
    titleInput.addEventListener('input', function() {
        updateClearBtnVisibility();
        if (this.value.trim()) hideError('titleError');
    });
    
    container.querySelector('#attachmentPlatform').addEventListener('change', function() {
        if (this.value) hideError('platformError');
    });
    clearBtn.onclick = function() {
        titleInput.value = '';
        titleInput.focus();
        const filenameDiv = container.querySelector('#generatedFilename');
        filenameDiv.innerHTML = '';
        hideAllErrors();
        clearBtn.style.background = '#f87171';
        clearBtn.style.color = '#fff';
        clearBtn.style.boxShadow = '0 2px 8px rgba(239,68,68,0.12)';
        setTimeout(() => {
            clearBtn.style.background = 'linear-gradient(90deg,#f3f4f6 60%,#e0e7ff 100%)';
            clearBtn.style.color = '#ef4444';
            clearBtn.style.boxShadow = '0 1px 4px rgba(59,130,246,0.07)';
        }, 700);
        updateClearBtnVisibility();
    };
    
    // Add focus indicators for clear button
    clearBtn.onfocus = function() {
        clearBtn.style.boxShadow = '0 0 0 2px #ffffff, 0 0 0 5px rgba(59, 130, 246, 0.8)';
        clearBtn.style.background = '#f3f4f6';
    };
    
    clearBtn.onblur = function() {
        clearBtn.style.boxShadow = 'none';
        clearBtn.style.background = 'transparent';
    };
    
    // Add refresh form functionality
    const refreshBtn = container.querySelector('#refreshFormBtn');
    refreshBtn.onclick = function() {
        // Reset all form fields
        container.querySelector('#attachmentStatus').value = '';
        titleInput.value = '';
        container.querySelector('#attachmentPlatform').value = '';
        
        // Clear generated filename
        const filenameDiv = container.querySelector('#generatedFilename');
        filenameDiv.innerHTML = '';
        
        // Hide all errors
        hideAllErrors();
        
        // Update clear button visibility
        updateClearBtnVisibility();
        
        // Focus on first field
        container.querySelector('#attachmentStatus').focus();
        
        // Visual feedback for refresh button
        refreshBtn.style.background = '#e0e7ff';
        refreshBtn.style.color = '#3730a3';
        refreshBtn.style.transform = 'rotate(180deg)';
        refreshBtn.style.boxShadow = '0 2px 8px rgba(59,130,246,0.15)';
        
        setTimeout(() => {
            refreshBtn.style.background = '#ffffff';
            refreshBtn.style.color = '#475569';
            refreshBtn.style.transform = 'rotate(0deg)';
            refreshBtn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
        }, 300);
    };
    
    // Add focus indicators for refresh button
    refreshBtn.onfocus = function() {
        refreshBtn.style.boxShadow = '0 0 0 2px #ffffff, 0 0 0 5px rgba(59, 130, 246, 0.8), 0 1px 2px rgba(0,0,0,0.05)';
        refreshBtn.style.borderColor = '#2563eb';
    };
    
    refreshBtn.onblur = function() {
        refreshBtn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
        refreshBtn.style.borderColor = '#cbd5e1';
    };
    
    container.querySelector('#generateFilenameBtn').onclick = function() {
        let title = titleInput.value;
        const platform = container.querySelector('#attachmentPlatform').value;
        const status = container.querySelector('#attachmentStatus').value;
        const filenameDiv = container.querySelector('#generatedFilename');
        
        // Clear any previous errors and results
        hideAllErrors();
        filenameDiv.innerHTML = '';
        
        let hasErrors = false;
        
        if (!status) {
            showError('statusError', 'Please select a status.');
            hasErrors = true;
        }
        if (!title) {
            showError('titleError', 'Please enter a title.');
            hasErrors = true;
        }
        if (!platform) {
            showError('platformError', 'Please select a platform.');
            hasErrors = true;
        }
        
        if (hasErrors) {
            return;
        }
        // Normalize negative contractions to expanded forms
        const contractions = [
            { regex: /doesn't/gi, replacement: 'does not' },
            { regex: /shouldn't/gi, replacement: 'should not' },
            { regex: /couldn't/gi, replacement: 'could not' },
            { regex: /don't/gi, replacement: 'do not' },
            { regex: /can't/gi, replacement: 'cannot' },
            { regex: /won't/gi, replacement: 'will not' },
            { regex: /isn't/gi, replacement: 'is not' },
            { regex: /aren't/gi, replacement: 'are not' },
            { regex: /wasn't/gi, replacement: 'was not' },
            { regex: /weren't/gi, replacement: 'were not' },
            { regex: /hadn't/gi, replacement: 'had not' },
            { regex: /hasn't/gi, replacement: 'has not' },
            { regex: /wouldn't/gi, replacement: 'would not' },
            { regex: /mustn't/gi, replacement: 'must not' },
            { regex: /mightn't/gi, replacement: 'might not' },
            { regex: /needn't/gi, replacement: 'need not' }
        ];
        contractions.forEach(({ regex, replacement }) => {
            title = title.replace(regex, replacement);
        });
        // Auto-select screen reader based on platform
        let screenReader = 'Other';
        if (platform === 'iOS' || platform === 'macOS') {
            screenReader = 'VoiceOver';
        } else if (platform === 'Android') {
            screenReader = 'TalkBack';
        } else if (platform === 'Web') {
            screenReader = 'NVDA';
        } else if (platform === 'Windows') {
            screenReader = 'NVDA';
        }
        const filename = `${status}-${generateAttachmentFilename(title, platform, screenReader)}`;
        filenameDiv.innerHTML = `
            <div style="background:linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%);padding:1rem 1.25rem;border-radius:0.75rem;border:2px solid #e2e8f0;box-shadow:0 2px 8px rgba(0,0,0,0.04);width:100%;box-sizing:border-box;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
                    <div style="color:#475569;font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Generated Filename</div>
                    <button class="btn btn-secondary btn-copy-filename" style="padding:0.5rem 1rem;font-size:0.875rem;font-weight:500;border-radius:0.375rem;background:#ffffff;color:#475569;border:1px solid #cbd5e1;box-shadow:0 1px 2px rgba(0,0,0,0.05);transition:all 0.2s ease;outline:none;cursor:pointer;">
                        <i class="fas fa-copy" style="margin-right:0.375rem;"></i>Copy
                    </button>
                </div>
                <div style="font-family:Monaco,'Cascadia Code','Roboto Mono',Consolas,monospace;color:#1e293b;font-size:1rem;font-weight:500;line-height:1.4;word-break:break-all;background:#ffffff;padding:0.75rem;border-radius:0.5rem;border:1px solid #cbd5e1;">${filename}</div>
            </div>
        `;
        const copyBtn = container.querySelector('.btn-copy-filename');
        copyBtn.onkeydown = function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); copyBtn.click(); } };
        
        // Add focus indicators for copy button
        copyBtn.onfocus = function() {
            copyBtn.style.boxShadow = '0 0 0 2px #ffffff, 0 0 0 5px rgba(59, 130, 246, 0.8), 0 1px 2px rgba(0,0,0,0.05)';
            copyBtn.style.borderColor = '#2563eb';
        };
        
        copyBtn.onblur = function() {
            copyBtn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
            copyBtn.style.borderColor = '#cbd5e1';
        };
        
        copyBtn.onclick = function() {
            navigator.clipboard.writeText(filename).then(() => {
                copyBtn.innerHTML = '<i class="fas fa-check" style="margin-right:0.375rem;"></i>Copied!';
                copyBtn.style.background = '#f0fdf4';
                copyBtn.style.color = '#16a34a';
                copyBtn.style.borderColor = '#bbf7d0';
                copyBtn.style.transform = 'translateY(-1px)';
                copyBtn.style.boxShadow = '0 2px 4px rgba(34,197,94,0.1)';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy" style="margin-right:0.375rem;"></i>Copy';
                    copyBtn.style.background = '#ffffff';
                    copyBtn.style.color = '#475569';
                    copyBtn.style.borderColor = '#cbd5e1';
                    copyBtn.style.transform = 'translateY(0)';
                    copyBtn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
                }, 2000);
            });
        };
    };
}
document.addEventListener('DOMContentLoaded', setupAttachmentFilenameUI);
