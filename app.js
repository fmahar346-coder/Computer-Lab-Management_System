// CLMS App Script - Handles VFS, Terminal Emulator, Modern GUI, Syntax Highlighter, and UML Diagrams

// -------------------------------------------------------------
// 0. WEB AUDIO SYNTH SOUND ENGINE (100% Client-Side Synthesizer)
// -------------------------------------------------------------
const SoundEngine = {
    enabled: false,
    ctx: null,

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },

    toggle() {
        this.enabled = !this.enabled;
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        
        const btn = document.getElementById('audio-toggle-btn');
        if (btn) {
            if (this.enabled) {
                btn.innerHTML = '<i class="fas fa-volume-up"></i> Audio On';
                btn.classList.add('active');
                this.playBeep(600, 0.08); // success chirp
            } else {
                btn.innerHTML = '<i class="fas fa-volume-mute"></i> Audio Off';
                btn.classList.remove('active');
            }
        }
        return this.enabled;
    },

    playKey() {
        if (!this.enabled) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.frequency.setValueAtTime(800 + Math.random() * 500, this.ctx.currentTime);
            gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.03);
        } catch(e) {}
    },

    playEnter() {
        if (!this.enabled) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.frequency.setValueAtTime(320, this.ctx.currentTime);
            gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.08);
        } catch(e) {}
    },

    playDisk() {
        if (!this.enabled) return;
        this.init();
        try {
            let t = this.ctx.currentTime;
            for (let i = 0; i < 4; i++) {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.frequency.setValueAtTime(100 + Math.random() * 30, t);
                gain.gain.setValueAtTime(0.02, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
                osc.start(t);
                osc.stop(t + 0.05);
                t += 0.07;
            }
        } catch(e) {}
    },

    playBeep(freq = 800, duration = 0.1) {
        if (!this.enabled) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch(e) {}
    }
};

function toggleAudio() {
    SoundEngine.toggle();
}

// -------------------------------------------------------------
// 1. VIRTUAL FILESYSTEM (VFS) - Persistent via localStorage
// -------------------------------------------------------------
const VFS = {
    init() {
        if (!localStorage.getItem('CLMS_VFS_PC')) {
            localStorage.setItem('CLMS_VFS_PC', '101 Active\n102 Maintenance\n103 Active\n104 Booked\n');
        }
        if (!localStorage.getItem('CLMS_VFS_BOOKING')) {
            localStorage.setItem('CLMS_VFS_BOOKING', '2001 104\n2002 101\n');
        }
        if (!localStorage.getItem('CLMS_VFS_ISSUE')) {
            localStorage.setItem('CLMS_VFS_ISSUE', '1 Keyboard malfunction on PC 102\n2 Monitor screen flickering on PC 103\n');
        }
        if (!localStorage.getItem('CLMS_VFS_SESSION')) {
            localStorage.setItem('CLMS_VFS_SESSION', 'Session Started\nSession Ended\n');
        }
    },

    readFile(filename) {
        this.init();
        if (filename === 'pc_data.txt') return localStorage.getItem('CLMS_VFS_PC') || '';
        if (filename === 'booking.txt') return localStorage.getItem('CLMS_VFS_BOOKING') || '';
        if (filename === 'issues.txt') return localStorage.getItem('CLMS_VFS_ISSUE') || '';
        if (filename === 'session.txt') return localStorage.getItem('CLMS_VFS_SESSION') || '';
        return '';
    },

    writeFile(filename, content) {
        this.init();
        if (filename === 'pc_data.txt') localStorage.setItem('CLMS_VFS_PC', content);
        if (filename === 'booking.txt') localStorage.setItem('CLMS_VFS_BOOKING', content);
        if (filename === 'issues.txt') localStorage.setItem('CLMS_VFS_ISSUE', content);
        if (filename === 'session.txt') localStorage.setItem('CLMS_VFS_SESSION', content);
        
        SoundEngine.playDisk(); // Play floppy drive sound
        
        // Sync GUI dashboard and tables if visible
        ModernGUI.renderAll();
        // Sync File editor if visible
        if (window.FileManager) {
            FileManager.sync();
        }
    },

    appendFile(filename, line) {
        let current = this.readFile(filename);
        if (current && !current.endsWith('\n')) {
            current += '\n';
        }
        this.writeFile(filename, current + line + '\n');
    }
};

// -------------------------------------------------------------
// 2. RETRO CLI TERMINAL EMULATOR (C++ Simulator)
// -------------------------------------------------------------
const Terminal = {
    history: [],
    currentState: 'STATE_LOGIN_USER',
    tempData: {}, // Holds multi-step input data
    sessionActive: false,

    colors: {
        cyan: 'cli-color-cyan',
        yellow: 'cli-color-yellow',
        green: 'cli-color-green',
        red: 'cli-color-red',
        purple: 'cli-color-purple',
        white: 'cli-color-white'
    },

    init() {
        this.history = [];
        this.currentState = 'STATE_LOGIN_USER';
        this.tempData = {};
        this.sessionActive = false;
        
        this.printLine('=================================================', this.colors.cyan);
        this.printLine('      COMPUTER LAB MANAGEMENT SYSTEM (C++)', this.colors.cyan);
        this.printLine('=================================================', this.colors.cyan);
        this.printLine('\n=============== LOGIN ===============', this.colors.yellow);
        this.print('\nUsername: ', this.colors.white);
        this.updateDOM();
    },

    print(text, colorClass = '') {
        this.history.push({ text, colorClass, isInline: true });
    },

    printLine(text, colorClass = '') {
        this.history.push({ text, colorClass, isInline: false });
    },

    clearScreen() {
        this.history = [];
    },

    updateDOM() {
        const terminal = document.getElementById('cli-terminal');
        const historyContainer = document.getElementById('cli-history');
        if (!historyContainer) return;

        let html = '';
        this.history.forEach(item => {
            const span = `<span class="${item.colorClass}">${item.text}</span>`;
            if (item.isInline) {
                html += span;
            } else {
                html += span + '\n';
            }
        });
        historyContainer.innerHTML = html;
        terminal.scrollTop = terminal.scrollHeight;
    },

    handleInput(input) {
        input = input.trim();
        
        // Print the user's entered command to history
        this.history[this.history.length - 1].text += input; // Append entered text to the prompt line
        this.history[this.history.length - 1].isInline = false; // Make it a full line now
        this.printLine(''); // Add new line

        const state = this.currentState;
        
        switch(state) {
            case 'STATE_LOGIN_USER':
                this.tempData.username = input;
                this.currentState = 'STATE_LOGIN_PASS';
                this.print('Password: ', this.colors.white);
                break;
                
            case 'STATE_LOGIN_PASS':
                this.tempData.password = input;
                if (this.tempData.username === 'Fahad Mahar' && this.tempData.password === '2006') {
                    this.sessionActive = true;
                    VFS.appendFile('session.txt', 'Session Started');
                    this.printLine('=====================================', this.colors.green);
                    this.printLine('       LOGIN SUCCESSFUL', this.colors.green);
                    this.printLine('=====================================', this.colors.green);
                    this.printLine('\nSession Started!', this.colors.green);
                    this.currentState = 'STATE_PAUSE';
                    this.print('\nPress Enter to continue...', this.colors.white);
                } else {
                    this.printLine('=====================================', this.colors.red);
                    this.printLine('     INVALID LOGIN CREDENTIALS', this.colors.red);
                    this.printLine('=====================================', this.colors.red);
                    this.printLine('\nPress Enter to try again...', this.colors.red);
                    this.currentState = 'STATE_PAUSE_LOGIN';
                }
                break;

            case 'STATE_PAUSE_LOGIN':
                this.clearScreen();
                this.currentState = 'STATE_LOGIN_USER';
                this.printLine('=================================================', this.colors.cyan);
                this.printLine('      COMPUTER LAB MANAGEMENT SYSTEM (C++)', this.colors.cyan);
                this.printLine('=================================================', this.colors.cyan);
                this.printLine('\n=============== LOGIN ===============', this.colors.yellow);
                this.print('\nUsername: ', this.colors.white);
                break;

            case 'STATE_PAUSE':
                this.showMenu();
                break;

            case 'STATE_MENU':
                this.processMenuChoice(input);
                break;

            // Add Admin inputs
            case 'STATE_ADD_ADMIN_ID':
                this.tempData.adminId = input;
                this.currentState = 'STATE_ADD_ADMIN_NAME';
                this.print('Enter Name: ', this.colors.white);
                break;
            case 'STATE_ADD_ADMIN_NAME':
                this.tempData.adminName = input;
                this.currentState = 'STATE_ADD_ADMIN_ROLE';
                this.print('Enter Role: ', this.colors.white);
                break;
            case 'STATE_ADD_ADMIN_ROLE':
                this.tempData.adminRole = input;
                this.currentState = 'STATE_ADD_ADMIN_DEPT';
                this.print('Enter Department: ', this.colors.white);
                break;
            case 'STATE_ADD_ADMIN_DEPT':
                this.tempData.adminDept = input;
                this.printLine('\n===== ADMIN DETAILS =====', this.colors.white);
                this.printLine('User ID: ' + this.tempData.adminId);
                this.printLine('Name: ' + this.tempData.adminName);
                this.printLine('Role: ' + this.tempData.adminRole);
                this.printLine('Department: ' + this.tempData.adminDept);
                this.currentState = 'STATE_PAUSE';
                this.print('\nPress Enter to continue...', this.colors.white);
                break;

            // Add Student inputs
            case 'STATE_ADD_STUDENT_ID':
                this.tempData.studentId = input;
                this.currentState = 'STATE_ADD_STUDENT_NAME';
                this.print('Enter Name: ', this.colors.white);
                break;
            case 'STATE_ADD_STUDENT_NAME':
                this.tempData.studentName = input;
                this.currentState = 'STATE_ADD_STUDENT_ROLE';
                this.print('Enter Role: ', this.colors.white);
                break;
            case 'STATE_ADD_STUDENT_ROLE':
                this.tempData.studentRole = input;
                this.currentState = 'STATE_ADD_STUDENT_COURSE';
                this.print('Enter Course: ', this.colors.white);
                break;
            case 'STATE_ADD_STUDENT_COURSE':
                this.tempData.studentCourse = input;
                this.printLine('\n===== STUDENT DETAILS =====', this.colors.white);
                this.printLine('User ID: ' + this.tempData.studentId);
                this.printLine('Name: ' + this.tempData.studentName);
                this.printLine('Role: ' + this.tempData.studentRole);
                this.printLine('Course: ' + this.tempData.studentCourse);
                this.currentState = 'STATE_PAUSE';
                this.print('\nPress Enter to continue...', this.colors.white);
                break;

            // Add PC inputs
            case 'STATE_ADD_PC_ID':
                this.tempData.pcId = input;
                this.currentState = 'STATE_ADD_PC_STATUS';
                this.print('Enter Status: ', this.colors.white);
                break;
            case 'STATE_ADD_PC_STATUS':
                this.tempData.pcStatus = input;
                this.printLine('\n===== PC DETAILS =====', this.colors.white);
                this.printLine('PC ID: ' + this.tempData.pcId);
                this.printLine('Status: ' + this.tempData.pcStatus);
                VFS.appendFile('pc_data.txt', `${this.tempData.pcId} ${this.tempData.pcStatus}`);
                this.printLine('\nPC Data Saved Successfully!', this.colors.white);
                this.currentState = 'STATE_PAUSE';
                this.print('\nPress Enter to continue...', this.colors.white);
                break;

            // Search PC inputs
            case 'STATE_SEARCH_PC_ID':
                const searchId = parseInt(input);
                const pcFile = VFS.readFile('pc_data.txt');
                const pcs = pcFile.trim().split('\n');
                let foundPc = false;
                for (let pc of pcs) {
                    const parts = pc.split(' ');
                    if (parts.length >= 2 && parseInt(parts[0]) === searchId) {
                        this.printLine('\nPC Found!', this.colors.white);
                        this.printLine('PC ID: ' + parts[0]);
                        this.printLine('Status: ' + parts[1]);
                        foundPc = true;
                        break;
                    }
                }
                if (!foundPc) {
                    this.printLine('\nPC Not Found!', this.colors.white);
                }
                this.currentState = 'STATE_PAUSE';
                this.print('\nPress Enter to continue...', this.colors.white);
                break;

            // Update PC inputs
            case 'STATE_UPDATE_PC_ID':
                this.tempData.updatePcId = parseInt(input);
                const pcFileUpdate = VFS.readFile('pc_data.txt');
                const pcsUpdate = pcFileUpdate.trim().split('\n');
                let pcExists = false;
                for (let pc of pcsUpdate) {
                    const parts = pc.split(' ');
                    if (parts.length >= 2 && parseInt(parts[0]) === this.tempData.updatePcId) {
                        pcExists = true;
                        break;
                    }
                }
                if (pcExists) {
                    this.currentState = 'STATE_UPDATE_PC_STATUS';
                    this.print('Enter New Status: ', this.colors.white);
                } else {
                    this.printLine('\nPC Not Found!', this.colors.white);
                    this.currentState = 'STATE_PAUSE';
                    this.print('\nPress Enter to continue...', this.colors.white);
                }
                break;
            case 'STATE_UPDATE_PC_STATUS':
                const newStatus = input;
                const pcFileContent = VFS.readFile('pc_data.txt');
                const pcLines = pcFileContent.trim().split('\n');
                let updatedContent = '';
                for (let line of pcLines) {
                    const parts = line.split(' ');
                    if (parts.length >= 2) {
                        if (parseInt(parts[0]) === this.tempData.updatePcId) {
                            updatedContent += `${parts[0]} ${newStatus}\n`;
                        } else {
                            updatedContent += `${line}\n`;
                        }
                    }
                }
                VFS.writeFile('pc_data.txt', updatedContent);
                this.printLine('\nPC Updated Successfully!', this.colors.white);
                this.currentState = 'STATE_PAUSE';
                this.print('\nPress Enter to continue...', this.colors.white);
                break;

            // Delete PC inputs
            case 'STATE_DELETE_PC_ID':
                const deleteId = parseInt(input);
                const pcFileDel = VFS.readFile('pc_data.txt');
                const pcLinesDel = pcFileDel.trim().split('\n');
                let delContent = '';
                let delFound = false;
                for (let line of pcLinesDel) {
                    const parts = line.split(' ');
                    if (parts.length >= 2) {
                        if (parseInt(parts[0]) === deleteId) {
                            delFound = true;
                        } else {
                            delContent += `${line}\n`;
                        }
                    }
                }
                if (delFound) {
                    VFS.writeFile('pc_data.txt', delContent);
                    this.printLine('\nPC Deleted Successfully!', this.colors.white);
                } else {
                    this.printLine('\nPC Not Found!', this.colors.white);
                }
                this.currentState = 'STATE_PAUSE';
                this.print('\nPress Enter to continue...', this.colors.white);
                break;

            // Report Issue inputs
            case 'STATE_REPORT_ISSUE_ID':
                this.tempData.issueId = input;
                this.currentState = 'STATE_REPORT_ISSUE_DESC';
                this.print('Enter Issue Description: ', this.colors.white);
                break;
            case 'STATE_REPORT_ISSUE_DESC':
                this.tempData.issueDesc = input;
                VFS.appendFile('issues.txt', `${this.tempData.issueId} ${this.tempData.issueDesc}`);
                this.printLine('\nIssue Reported Successfully!', this.colors.green);
                this.currentState = 'STATE_PAUSE';
                this.print('\nPress Enter to continue...', this.colors.white);
                break;

            // Book PC inputs
            case 'STATE_BOOK_PC_STUDENT_ID':
                this.tempData.bookStudentId = input;
                this.currentState = 'STATE_BOOK_PC_ID';
                this.print('Enter PC ID: ', this.colors.white);
                break;
            case 'STATE_BOOK_PC_ID':
                this.tempData.bookPcId = input;
                VFS.appendFile('booking.txt', `${this.tempData.bookStudentId} ${this.tempData.bookPcId}`);
                
                // Update PC status to Booked in pc_data.txt
                const pcc = VFS.readFile('pc_data.txt').trim().split('\n');
                let newPcData = '';
                pcc.forEach(line => {
                    const parts = line.split(' ');
                    if (parts[0] === this.tempData.bookPcId) {
                        newPcData += `${parts[0]} Booked\n`;
                    } else if (parts[0]) {
                        newPcData += `${line}\n`;
                    }
                });
                VFS.writeFile('pc_data.txt', newPcData);
                
                this.printLine('\nBooking Successful!', this.colors.green);
                this.currentState = 'STATE_PAUSE';
                this.print('\nPress Enter to continue...', this.colors.white);
                break;
        }

        this.updateDOM();
    },

    showMenu() {
        this.clearScreen();
        this.currentState = 'STATE_MENU';
        this.tempData = {};
        
        this.printLine('=========================================================', this.colors.cyan);
        this.printLine('          COMPUTER LAB MANAGEMENT SYSTEM', this.colors.cyan);
        this.printLine('=========================================================', this.colors.cyan);
        this.printLine(' 1.  Add Admin', this.colors.yellow);
        this.printLine(' 2.  Add Student', this.colors.yellow);
        this.printLine('---------------------------------------------------------', this.colors.yellow);
        this.printLine(' 3.  Add PC', this.colors.yellow);
        this.printLine(' 4.  View All PCs', this.colors.yellow);
        this.printLine(' 5.  Search PC', this.colors.yellow);
        this.printLine(' 6.  Update PC', this.colors.yellow);
        this.printLine(' 7.  Delete PC', this.colors.yellow);
        this.printLine('---------------------------------------------------------', this.colors.yellow);
        this.printLine(' 8.  Report Issue', this.colors.yellow);
        this.printLine(' 9.  View Issues', this.colors.yellow);
        this.printLine('---------------------------------------------------------', this.colors.yellow);
        this.printLine('10. Dashboard', this.colors.yellow);
        this.printLine('11. Book PC', this.colors.yellow);
        this.printLine('12. View Bookings', this.colors.yellow);
        this.printLine('---------------------------------------------------------', this.colors.yellow);
        this.printLine('13. Polymorphism Demo', this.colors.yellow);
        this.printLine('14. About Project', this.colors.yellow);
        this.printLine('15. Exit', this.colors.yellow);
        this.printLine('=========================================================', this.colors.cyan);
        this.print('\nEnter Choice: ', this.colors.white);
        this.updateDOM();
    },

    processMenuChoice(choice) {
        const option = parseInt(choice);
        
        switch(option) {
            case 1:
                this.clearScreen();
                this.printLine('========== ADD ADMIN ==========\n', this.colors.white);
                this.currentState = 'STATE_ADD_ADMIN_ID';
                this.print('Enter User ID: ', this.colors.white);
                break;
            case 2:
                this.clearScreen();
                this.printLine('========== ADD STUDENT ==========\n', this.colors.white);
                this.currentState = 'STATE_ADD_STUDENT_ID';
                this.print('Enter User ID: ', this.colors.white);
                break;
            case 3:
                this.clearScreen();
                this.printLine('========== ADD PC ==========\n', this.colors.white);
                this.currentState = 'STATE_ADD_PC_ID';
                this.print('Enter PC ID: ', this.colors.white);
                break;
            case 4:
                this.clearScreen();
                this.printLine('========== VIEW ALL PCs ==========\n', this.colors.white);
                const pcFile = VFS.readFile('pc_data.txt');
                const pcs = pcFile.trim().split('\n');
                this.printLine('===== ALL PC RECORDS =====', this.colors.white);
                pcs.forEach(pc => {
                    const parts = pc.split(' ');
                    if (parts.length >= 2) {
                        this.printLine('PC ID: ' + parts[0]);
                        this.printLine('Status: ' + parts[1]);
                        this.printLine('------------------');
                    }
                });
                this.currentState = 'STATE_PAUSE';
                this.print('\nPress Enter to continue...', this.colors.white);
                break;
            case 5:
                this.clearScreen();
                this.printLine('========== SEARCH PC ==========\n', this.colors.white);
                this.currentState = 'STATE_SEARCH_PC_ID';
                this.print('Enter PC ID to Search: ', this.colors.white);
                break;
            case 6:
                this.clearScreen();
                this.printLine('========== UPDATE PC ==========\n', this.colors.white);
                this.currentState = 'STATE_UPDATE_PC_ID';
                this.print('Enter PC ID to Update: ', this.colors.white);
                break;
            case 7:
                this.clearScreen();
                this.printLine('========== DELETE PC ==========\n', this.colors.white);
                this.currentState = 'STATE_DELETE_PC_ID';
                this.print('Enter PC ID to Delete: ', this.colors.white);
                break;
            case 8:
                this.clearScreen();
                this.printLine('========== REPORT ISSUE ==========\n', this.colors.white);
                this.currentState = 'STATE_REPORT_ISSUE_ID';
                this.print('Enter Issue ID: ', this.colors.white);
                break;
            case 9:
                this.clearScreen();
                this.printLine('========== VIEW ISSUES ==========\n', this.colors.white);
                const issueFile = VFS.readFile('issues.txt');
                const issues = issueFile.trim().split('\n');
                this.printLine('===== REPORTED ISSUES =====', this.colors.cyan);
                issues.forEach(line => {
                    if (line) {
                        const firstSpace = line.indexOf(' ');
                        const id = line.substring(0, firstSpace);
                        const desc = line.substring(firstSpace + 1);
                        this.printLine('Issue ID: ' + id);
                        this.printLine('Description: ' + desc);
                        this.printLine('----------------------');
                    }
                });
                this.currentState = 'STATE_PAUSE';
                this.print('\nPress Enter to continue...', this.colors.white);
                break;
            case 10:
                this.clearScreen();
                this.printLine('=================================================', this.colors.cyan);
                this.printLine('         COMPUTER LAB DASHBOARD', this.colors.cyan);
                this.printLine('=================================================\n', this.colors.cyan);
                this.printLine(' [OK] System Status      : Running Successfully', this.colors.green);
                this.printLine(' [OK] Login System       : Active', this.colors.green);
                this.printLine(' [OK] Session Manager    : Active', this.colors.green);
                this.printLine(' [OK] Admin Module       : Active', this.colors.green);
                this.printLine(' [OK] Student Module     : Active', this.colors.green);
                this.printLine(' [OK] PC Management      : Active', this.colors.green);
                this.printLine(' [OK] Issue Management   : Active', this.colors.green);
                this.printLine(' [OK] Booking System     : Active', this.colors.green);
                this.printLine(' [OK] File Handling      : Active', this.colors.green);
                this.printLine(' [OK] OOP Concepts       : Implemented', this.colors.green);
                this.printLine('\n=================================================', this.colors.yellow);
                this.printLine(' Encapsulation  : YES', this.colors.yellow);
                this.printLine(' Inheritance    : YES', this.colors.yellow);
                this.printLine(' Polymorphism   : YES', this.colors.yellow);
                this.printLine('=================================================', this.colors.yellow);
                this.currentState = 'STATE_PAUSE';
                this.print('\nPress Enter to continue...', this.colors.white);
                break;
            case 11:
                this.clearScreen();
                this.printLine('========== BOOK PC ==========\n', this.colors.white);
                this.currentState = 'STATE_BOOK_PC_STUDENT_ID';
                this.print('Enter Student ID: ', this.colors.white);
                break;
            case 12:
                this.clearScreen();
                this.printLine('========== VIEW BOOKINGS ==========\n', this.colors.white);
                const bookFile = VFS.readFile('booking.txt');
                const bookings = bookFile.trim().split('\n');
                this.printLine('===== BOOKINGS =====', this.colors.cyan);
                bookings.forEach(booking => {
                    const parts = booking.split(' ');
                    if (parts.length >= 2) {
                        this.printLine(`Student ID: ${parts[0]} -> PC ID: ${parts[1]}`);
                    }
                });
                this.currentState = 'STATE_PAUSE';
                this.print('\nPress Enter to continue...', this.colors.white);
                break;
            case 13:
                this.clearScreen();
                this.printLine('=====================================', this.colors.purple);
                this.printLine('         POLYMORPHISM DEMO', this.colors.purple);
                this.printLine('=====================================\n', this.colors.purple);
                this.printLine('ADMIN OBJECT:\n');
                this.printLine('===== USER DETAILS =====');
                this.printLine('User ID: 1001');
                this.printLine('Name: Fahad Mahar');
                this.printLine('Role: Lab Admin');
                this.printLine('Department: IT Services');
                this.printLine('\n-------------------------------------\n');
                this.printLine('STUDENT OBJECT:\n');
                this.printLine('===== USER DETAILS =====');
                this.printLine('User ID: 2001');
                this.printLine('Name: Sabreena Asad');
                this.printLine('Role: Undergrad');
                this.printLine('Course: Computer Science');
                this.currentState = 'STATE_PAUSE';
                this.print('\nPress Enter to continue...', this.colors.white);
                break;
            case 14:
                this.clearScreen();
                this.printLine('=================================================', this.colors.cyan);
                this.printLine('                ABOUT PROJECT', this.colors.cyan);
                this.printLine('=================================================\n', this.colors.cyan);
                this.printLine(' Project Title:');
                this.printLine(' Computer Lab Management System\n');
                this.printLine(' Developed Using:');
                this.printLine(' - C++ Programming Language');
                this.printLine(' - Object Oriented Programming');
                this.printLine(' - File Handling\n');
                this.printLine(' OOP Concepts Implemented:');
                this.printLine(' - Encapsulation');
                this.printLine(' - Inheritance');
                this.printLine(' - Polymorphism\n');
                this.printLine(' System Modules:');
                this.printLine(' - Login System');
                this.printLine(' - Session Management');
                this.printLine(' - Admin Management');
                this.printLine(' - Student Management');
                this.printLine(' - PC Management');
                this.printLine(' - Issue Reporting');
                this.printLine(' - Dashboard');
                this.printLine(' - Booking System\n');
                this.printLine(' Developed By:');
                this.printLine(' Fahad Mahar And Sabreena Asad');
                this.printLine('\n=================================================', this.colors.cyan);
                this.currentState = 'STATE_PAUSE';
                this.print('\nPress Enter to continue...', this.colors.white);
                break;
            case 15:
                this.clearScreen();
                this.sessionActive = false;
                VFS.appendFile('session.txt', 'Session Ended');
                this.printLine('Session Ended!', this.colors.red);
                this.printLine('\nExiting Program...\n', this.colors.red);
                this.currentState = 'STATE_PAUSE_LOGIN';
                this.print('Press Enter to restart console login...', this.colors.white);
                break;
            default:
                this.printLine('\nInvalid Choice!', this.colors.red);
                this.currentState = 'STATE_PAUSE';
                this.print('\nPress Enter to continue...', this.colors.white);
                break;
        }
        
        this.updateDOM();
    }
};

// -------------------------------------------------------------
// 3. MODERN GUI APPLICATION
// -------------------------------------------------------------
const ModernGUI = {
    currentTab: 'pc-mgt',
    demoType: 'admin',

    init() {
        this.renderAll();
        this.setupEventListeners();
    },

    renderAll() {
        this.renderDashboardStats();
        this.renderPCTable();
        this.renderBookingTable();
        this.renderIssueTable();
        this.renderPolymorphismDemo();
        this.populatePCDropdowns();
    },

    renderDashboardStats() {
        const pcs = VFS.readFile('pc_data.txt').trim().split('\n').filter(Boolean);
        const bookings = VFS.readFile('booking.txt').trim().split('\n').filter(Boolean);
        const issues = VFS.readFile('issues.txt').trim().split('\n').filter(Boolean);
        
        document.getElementById('stat-total-pcs').innerText = pcs.length;
        document.getElementById('stat-active-bookings').innerText = bookings.length;
        document.getElementById('stat-reported-issues').innerText = issues.length;
        
        const sessionDot = document.getElementById('header-session-dot');
        const sessionText = document.getElementById('header-session-text');
        
        if (Terminal.sessionActive) {
            sessionDot.className = 'status-dot';
            sessionText.innerText = 'Session: Active';
        } else {
            sessionDot.className = 'status-dot inactive';
            sessionText.innerText = 'Session: Inactive';
        }
    },

    renderPCTable() {
        const tbody = document.getElementById('gui-pc-table-body');
        if (!tbody) return;

        const pcs = VFS.readFile('pc_data.txt').trim().split('\n').filter(Boolean);
        let html = '';
        
        pcs.forEach(pc => {
            const parts = pc.split(' ');
            if (parts.length >= 2) {
                const id = parts[0];
                const status = parts[1];
                let badgeClass = 'badge-status active';
                if (status === 'Booked') badgeClass = 'badge-status booked';
                if (status === 'Maintenance') badgeClass = 'badge-status maintenance';

                html += `
                    <tr>
                        <td><strong>PC-${id}</strong></td>
                        <td><span class="${badgeClass}">${status}</span></td>
                        <td>
                            <select onchange="ModernGUI.updatePCStatus('${id}', this.value)" class="form-control" style="padding: 0.25rem 0.5rem; display: inline-block; width: auto; font-size: 0.8rem;">
                                <option value="">Update Status</option>
                                <option value="Active">Active</option>
                                <option value="Booked">Booked</option>
                                <option value="Maintenance">Maintenance</option>
                            </select>
                            <button onclick="ModernGUI.deletePC('${id}')" class="btn btn-danger btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.8rem; margin-left: 0.5rem;">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </td>
                    </tr>
                `;
            }
        });

        tbody.innerHTML = html || '<tr><td colspan="3" style="text-align: center; color: var(--text-muted);">No PC records found.</td></tr>';
    },

    renderBookingTable() {
        const tbody = document.getElementById('gui-booking-table-body');
        if (!tbody) return;

        const bookings = VFS.readFile('booking.txt').trim().split('\n').filter(Boolean);
        let html = '';

        bookings.forEach(booking => {
            const parts = booking.split(' ');
            if (parts.length >= 2) {
                html += `
                    <tr>
                        <td>Student #${parts[0]}</td>
                        <td><strong>PC-${parts[1]}</strong></td>
                        <td><span class="badge badge-success">Confirmed</span></td>
                    </tr>
                `;
            }
        });

        tbody.innerHTML = html || '<tr><td colspan="3" style="text-align: center; color: var(--text-muted);">No active bookings found.</td></tr>';
    },

    renderIssueTable() {
        const tbody = document.getElementById('gui-issue-table-body');
        if (!tbody) return;

        const issues = VFS.readFile('issues.txt').trim().split('\n').filter(Boolean);
        let html = '';

        issues.forEach(issue => {
            if (issue) {
                const spaceIdx = issue.indexOf(' ');
                const id = issue.substring(0, spaceIdx);
                const desc = issue.substring(spaceIdx + 1);

                html += `
                    <tr>
                        <td>#${id}</td>
                        <td>${desc}</td>
                        <td><span class="badge badge-primary">Reported</span></td>
                    </tr>
                `;
            }
        });

        tbody.innerHTML = html || '<tr><td colspan="3" style="text-align: center; color: var(--text-muted);">No issues reported.</td></tr>';
    },

    populatePCDropdowns() {
        const select = document.getElementById('book-pc-select');
        if (!select) return;

        const pcs = VFS.readFile('pc_data.txt').trim().split('\n').filter(Boolean);
        let options = '<option value="">Select a PC</option>';
        pcs.forEach(pc => {
            const parts = pc.split(' ');
            if (parts.length >= 2 && parts[1] === 'Active') {
                options += `<option value="${parts[0]}">PC-${parts[0]}</option>`;
            }
        });
        select.innerHTML = options;
    },

    addPC(id, status) {
        if (!id || !status) return;
        VFS.appendFile('pc_data.txt', `${id} ${status}`);
        this.renderAll();
    },

    deletePC(id) {
        const pcs = VFS.readFile('pc_data.txt').trim().split('\n').filter(Boolean);
        let newContent = '';
        pcs.forEach(pc => {
            const parts = pc.split(' ');
            if (parts[0] !== id) {
                newContent += `${pc}\n`;
            }
        });
        VFS.writeFile('pc_data.txt', newContent);
        this.renderAll();
    },

    updatePCStatus(id, newStatus) {
        if (!newStatus) return;
        const pcs = VFS.readFile('pc_data.txt').trim().split('\n').filter(Boolean);
        let newContent = '';
        pcs.forEach(pc => {
            const parts = pc.split(' ');
            if (parts[0] === id) {
                newContent += `${id} ${newStatus}\n`;
            } else {
                newContent += `${pc}\n`;
            }
        });
        VFS.writeFile('pc_data.txt', newContent);
        this.renderAll();
    },

    bookPC(studentId, pcId) {
        if (!studentId || !pcId) return;
        VFS.appendFile('booking.txt', `${studentId} ${pcId}`);
        this.updatePCStatus(pcId, 'Booked');
        this.renderAll();
    },

    reportIssue(issueId, desc) {
        if (!issueId || !desc) return;
        VFS.appendFile('issues.txt', `${issueId} ${desc}`);
        this.renderAll();
    },

    switchSubTab(tabName) {
        this.currentTab = tabName;
        document.querySelectorAll('.gui-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.gui-view').forEach(view => {
            view.classList.remove('active');
        });

        document.getElementById(`gui-tab-${tabName}`).classList.add('active');
        document.getElementById(`gui-view-${tabName}`).classList.add('active');
    },

    setDemoType(type) {
        this.demoType = type;
        document.getElementById('demo-btn-admin').className = type === 'admin' ? 'gui-tab-btn active' : 'gui-tab-btn';
        document.getElementById('demo-btn-student').className = type === 'student' ? 'gui-tab-btn active' : 'gui-tab-btn';
        this.renderPolymorphismDemo();
    },

    renderPolymorphismDemo() {
        const container = document.getElementById('polymorphism-card-render');
        if (!container) return;

        if (this.demoType === 'admin') {
            container.innerHTML = `
                <div class="detail-bubble" style="border-left: 4px solid var(--primary);">
                    <p style="color: var(--primary); font-weight: 700; margin-bottom: 0.5rem;"><i class="fas fa-microchip"></i> Instantiate: User* ptr = new Admin();</p>
                    <div style="font-family: var(--font-mono); font-size: 0.85rem; line-height: 1.6;">
                        <div>class Admin : public User {</div>
                        <div style="padding-left: 1.5rem; color: var(--text-muted);">string department = "IT Services";</div>
                        <div>};</div>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="detail-bubble" style="border-left: 4px solid var(--secondary);">
                    <p style="color: var(--secondary); font-weight: 700; margin-bottom: 0.5rem;"><i class="fas fa-graduation-cap"></i> Instantiate: User* ptr = new Student();</p>
                    <div style="font-family: var(--font-mono); font-size: 0.85rem; line-height: 1.6;">
                        <div>class Student : public User {</div>
                        <div style="padding-left: 1.5rem; color: var(--text-muted);">string course = "Computer Science";</div>
                        <div>};</div>
                    </div>
                </div>
            `;
        }

        // Reset virtual function output
        document.getElementById('polymorphism-output-result').innerHTML = `
            <div style="text-align: center; color: var(--text-muted); font-style: italic;">
                Click "Invoke Virtual Function" below to call displayUser() dynamically.
            </div>
        `;
    },

    invokeVirtualFunction() {
        const resultBox = document.getElementById('polymorphism-output-result');
        if (!resultBox) return;

        if (this.demoType === 'admin') {
            resultBox.innerHTML = `
                <div class="cli-terminal" style="height: auto; padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color); background-color: #0c0f17; font-size: 0.8rem;">
                    <span class="cli-color-cyan">ptr-&gt;displayUser();</span>
                    <span class="cli-color-white">
===== USER DETAILS =====
User ID: 1001
Name: Fahad Mahar
Role: Lab Admin
Department: IT Services</span>
                </div>
                <div style="margin-top: 0.75rem; font-size: 0.85rem; color: var(--success); font-weight: 600;">
                    <i class="fas fa-check-circle"></i> Resolved Dynamically! The program maps ptr (User*) to the concrete Admin implementation.
                </div>
            `;
        } else {
            resultBox.innerHTML = `
                <div class="cli-terminal" style="height: auto; padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color); background-color: #0c0f17; font-size: 0.8rem;">
                    <span class="cli-color-cyan">ptr-&gt;displayUser();</span>
                    <span class="cli-color-white">
===== USER DETAILS =====
User ID: 2001
Name: Sabreena Asad
Role: Undergrad
Course: Computer Science</span>
                </div>
                <div style="margin-top: 0.75rem; font-size: 0.85rem; color: var(--success); font-weight: 600;">
                    <i class="fas fa-check-circle"></i> Resolved Dynamically! The program maps ptr (User*) to the concrete Student implementation.
                </div>
            `;
        }
    },

    setupEventListeners() {
        // Form submissions
        document.getElementById('form-add-pc')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('input-pc-id').value;
            const status = document.getElementById('input-pc-status').value;
            this.addPC(id, status);
            document.getElementById('form-add-pc').reset();
        });

        document.getElementById('form-book-pc')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const sid = document.getElementById('book-student-id').value;
            const pid = document.getElementById('book-pc-select').value;
            this.bookPC(sid, pid);
            document.getElementById('form-book-pc').reset();
        });

        document.getElementById('form-report-issue')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const iid = document.getElementById('report-issue-id').value;
            const desc = document.getElementById('report-issue-desc').value;
            this.reportIssue(iid, desc);
            document.getElementById('form-report-issue').reset();
        });
    }
};

// -------------------------------------------------------------
// 4. CODE EXPLORER & SYNTAX HIGHLIGHTER
// -------------------------------------------------------------
const CodeExplorer = {
    activeFile: 'main.cpp',

    init() {
        this.renderFileTree();
        this.loadFile(this.activeFile);
    },

    renderFileTree() {
        const headersList = document.getElementById('tree-headers');
        const sourcesList = document.getElementById('tree-sources');
        if (!headersList || !sourcesList) return;

        let headersHtml = '';
        let sourcesHtml = '';

        Object.keys(codebase).sort().forEach(filename => {
            const isActive = filename === this.activeFile ? 'active' : '';
            const isHeader = filename.endsWith('.h');
            const icon = isHeader ? '<i class="fas fa-file-code h-icon"></i>' : '<i class="fas fa-file-signature cpp-icon"></i>';
            
            const html = `<li class="file-tree-item ${isActive}" onclick="CodeExplorer.loadFile('${filename}')">${icon} ${filename}</li>`;
            
            if (isHeader) {
                headersHtml += html;
            } else if (filename.endsWith('.cpp')) {
                sourcesHtml += html;
            }
        });

        // Add dev file to sources or separate
        const devActive = this.activeFile === 'COMPUTERLABMANAGEMENTSYSTEM.dev' ? 'active' : '';
        sourcesHtml += `<li class="file-tree-item ${devActive}" onclick="CodeExplorer.loadFile('COMPUTERLABMANAGEMENTSYSTEM.dev')"><i class="fas fa-project-diagram" style="color: #10b981;"></i> CLMS.dev</li>`;

        headersList.innerHTML = headersHtml;
        sourcesList.innerHTML = sourcesHtml;
    },

    loadFile(filename) {
        this.activeFile = filename;
        
        // Update tree active highlight
        document.querySelectorAll('.file-tree-item').forEach(item => {
            item.classList.remove('active');
            if (item.innerText.trim() === filename || (filename.endsWith('.dev') && item.innerText.trim() === 'CLMS.dev')) {
                item.classList.add('active');
            }
        });

        document.getElementById('viewer-file-name').innerText = filename;
        
        const code = codebase[filename] || '';
        const lines = code.split('\n');
        
        // Line numbers
        let numbersHtml = '';
        for (let i = 1; i <= lines.length; i++) {
            numbersHtml += `${i}\n`;
        }
        document.getElementById('code-line-numbers').innerText = numbersHtml;

        // Syntax highlighting
        const codeElement = document.getElementById('code-view-container');
        codeElement.innerHTML = this.highlightCPlusPlus(code);
    },

    highlightCPlusPlus(source) {
        // Escape HTML tags to prevent broken rendering
        let code = source
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Highlight Keywords
        const keywords = [
            '#include', '#ifndef', '#define', '#endif', 'inline',
            'int', 'double', 'float', 'string', 'char', 'bool', 'void', 'virtual',
            'class', 'struct', 'public', 'private', 'protected',
            'return', 'if', 'else', 'do', 'while', 'switch', 'case', 'break', 'default',
            'using', 'namespace', 'const'
        ];
        
        // Match words and replace keywords
        keywords.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'g');
            code = code.replace(regex, `<span class="hl-keyword">${word}</span>`);
        });

        // Standard library symbols
        const stdSymbols = [
            'std', 'cout', 'cin', 'endl', 'getline', 'ifstream', 'ofstream', 
            'ios', 'app', 'system', 'setColor', 'Admin', 'Student', 'PC', 'Booking', 
            'Issue', 'Session', 'Dashboard', 'Login', 'User'
        ];
        stdSymbols.forEach(sym => {
            const regex = new RegExp(`\\b${sym}\\b`, 'g');
            code = code.replace(regex, `<span class="hl-std">${sym}</span>`);
        });

        // Highlight numbers
        code = code.replace(/\b(\d+)\b/g, '<span class="hl-number">$1</span>');

        // Highlight string literals
        code = code.replace(/(&quot;.*?[^\\]&quot;|".*?[^\\]")/g, '<span class="hl-string">$1</span>');

        // Highlight single line comments
        code = code.replace(/(\/\/.*)/g, '<span class="hl-comment">$1</span>');

        // Highlight block comments
        code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="hl-comment">$1</span>');

        return code;
    },

    copyCode() {
        const code = codebase[this.activeFile] || '';
        navigator.clipboard.writeText(code).then(() => {
            const copyBtn = document.getElementById('code-copy-btn');
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        });
    }
};

// -------------------------------------------------------------
// 5. VIEW ROUTER (Tab switching)
// -------------------------------------------------------------
function switchView(viewName) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.tab-view').forEach(view => {
        view.classList.remove('active');
    });

    document.getElementById(`nav-${viewName}`).classList.add('active');
    document.getElementById(`view-${viewName}`).classList.add('active');

    // Update Page Title
    const titleMap = {
        'dashboard': 'Lab System Dashboard',
        'cli': 'C++ Console Simulator',
        'gui': 'Modern Administration GUI',
        'code': 'C++ Source Code Explorer',
        'uml': 'UML Architecture Diagrams'
    };
    const titleElement = document.getElementById('current-page-title');
    if (titleElement && titleMap[viewName]) {
        titleElement.innerText = titleMap[viewName];
    }

    // Render UML diagrams using Mermaid if entering UML section
    if (viewName === 'uml') {
        setTimeout(() => {
            if (window.mermaid) {
                window.mermaid.init(undefined, document.querySelectorAll('.mermaid'));
            }
        }, 100);
    }
}

// -------------------------------------------------------------
// 6. INITIALIZATION & THEME TOGGLING
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Init VFS
    VFS.init();

    // Init modules
    Terminal.init();
    ModernGUI.init();
    CodeExplorer.init();

    // CLI Input Event Listener
    const cliInput = document.getElementById('cli-input-field');
    cliInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = cliInput.value;
            cliInput.value = '';
            Terminal.handleInput(input);
        }
    });

    // Keep CLI input focused when terminal clicked
    document.getElementById('cli-terminal')?.addEventListener('click', () => {
        cliInput.focus();
    });

    // Theme Selector toggle
    const themeCheckbox = document.getElementById('theme-toggle-cb');
    themeCheckbox?.addEventListener('change', () => {
        if (themeCheckbox.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    });
});
