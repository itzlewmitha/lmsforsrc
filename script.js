// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZ2BxgOgJeXPkr3G8DexJ7bjnTyd-kUOA",
    authDomain: "lmsforsrc.firebaseapp.com",
    projectId: "lmsforsrc",
    storageBucket: "lmsforsrc.firebasestorage.app",
    messagingSenderId: "53237902015",
    appId: "1:53237902015:web:e4d304974484a04185b40a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const loginPage = document.getElementById('loginPage');
const dashboardPage = document.getElementById('dashboardPage');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('loginError');
const userEmail = document.getElementById('userEmail');
const currentDate = document.getElementById('currentDate');

// Navigation
const navLinks = document.querySelectorAll('.sidebar-nav a');
const sections = document.querySelectorAll('.section');

// Dashboard Elements
const totalBooksEl = document.getElementById('totalBooks');
const rentedBooksEl = document.getElementById('rentedBooks');
const overdueBooksEl = document.getElementById('overdueBooks');
const registeredUsersEl = document.getElementById('registeredUsers');
const recentRentalsBody = document.getElementById('recentRentalsBody');
const availableCopiesEl = document.getElementById('availableCopies');

// Books Management
const booksTableBody = document.getElementById('booksTableBody');
const booksLoading = document.getElementById('booksLoading');
const booksEmptyState = document.getElementById('booksEmptyState');
const addBookBtn = document.getElementById('addBookBtn');
const addBookEmptyBtn = document.getElementById('addBookEmptyBtn');
const generateBarcodeToolBtn = document.getElementById('generateBarcodeToolBtn');
const bookSearchInput = document.getElementById('bookSearchInput');
const bookStatusFilter = document.getElementById('bookStatusFilter');

// Book Modal Elements
const bookModal = document.getElementById('bookModal');
const closeBookModal = document.getElementById('closeBookModal');
const cancelBookBtn = document.getElementById('cancelBookBtn');
const bookForm = document.getElementById('bookForm');
const modalTitle = document.getElementById('modalTitle');
const modalBarcode = document.getElementById('modalBarcode');
const modalTitleInput = document.getElementById('modalTitleInput');
const modalAuthor = document.getElementById('modalAuthor');
const modalQuantity = document.getElementById('modalQuantity');
const modalbooknumber = document.getElementById('modalbooknumber');
const modalPublisher = document.getElementById('modalPublisher');
const modalYear = document.getElementById('modalYear');
const modalCategory = document.getElementById('modalCategory');
const modalStatus = document.getElementById('modalStatus');
const saveBookBtn = document.getElementById('saveBookBtn');
const bookModalError = document.getElementById('bookModalError');

// Barcode Scanner/Generate Elements
const scanModalBarcodeBtn = document.getElementById('scanModalBarcodeBtn');
const generateModalBarcodeBtn = document.getElementById('generateModalBarcodeBtn');
const scanBookBarcodeBtn = document.getElementById('scanBookBarcodeBtn');
const generateBookBarcodeBtn = document.getElementById('generateBookBarcodeBtn');
const scanReturnBarcodeBtn = document.getElementById('scanReturnBarcodeBtn');

// Rent Book Elements
const admissionNumberInput = document.getElementById('admissionNumber');
const userNameInput = document.getElementById('userName');
const bookBarcodeInput = document.getElementById('bookBarcode');
const bookTitleInput = document.getElementById('bookTitle');
const rentDateInput = document.getElementById('rentDate');
const dueDateInput = document.getElementById('dueDate');
const checkUserBtn = document.getElementById('checkUserBtn');
const checkBookBtn = document.getElementById('checkBookBtn');
const rentBookBtn = document.getElementById('rentBookBtn');
const rentError = document.getElementById('rentError');
const rentSuccess = document.getElementById('rentSuccess');
const activeRentalsBody = document.getElementById('activeRentalsBody');

// Returns & Overdue
const returnBarcodeInput = document.getElementById('returnBarcode');
const returnAdmissionInput = document.getElementById('returnAdmission');
const checkReturnBtn = document.getElementById('checkReturnBtn');
const returnBookBtn = document.getElementById('returnBookBtn');
const returnError = document.getElementById('returnError');
const returnSuccess = document.getElementById('returnSuccess');
const overdueTableBody = document.getElementById('overdueTableBody');

// Return Modal
const returnModal = document.getElementById('returnModal');
const closeReturnModal = document.getElementById('closeReturnModal');
const cancelReturnBtn = document.getElementById('cancelReturnBtn');
const confirmReturnBtn = document.getElementById('confirmReturnBtn');
const confirmUserName = document.getElementById('confirmUserName');
const confirmBookTitle = document.getElementById('confirmBookTitle');
const confirmRentDate = document.getElementById('confirmRentDate');
const confirmDueDate = document.getElementById('confirmDueDate');
const confirmDaysOverdue = document.getElementById('confirmDaysOverdue');
const returnModalError = document.getElementById('returnModalError');

// Reports
const refreshReportsBtn = document.getElementById('refreshReportsBtn');
const reportTotalBooks = document.getElementById('reportTotalBooks');
const availableBooks = document.getElementById('availableBooks');
const reportRentedBooks = document.getElementById('reportRentedBooks');
const activeUsers = document.getElementById('activeUsers');
const categoryTableBody = document.getElementById('categoryTableBody');
const popularBooksBody = document.getElementById('popularBooksBody');

// Barcode Scanner Modal
const barcodeScannerModal = document.getElementById('barcodeScannerModal');
const closeScannerModal = document.getElementById('closeScannerModal');
const cameraSelect = document.getElementById('cameraSelect');
const scannerVideo = document.getElementById('scanner-video');
const scannerResult = document.getElementById('scanner-result');
const detectedBarcodeSpan = document.getElementById('detected-barcode');
const useBarcodeBtn = document.getElementById('useBarcodeBtn');
const scanAgainBtn = document.getElementById('scanAgainBtn');
const manualBarcodeInput = document.getElementById('manualBarcode');
const manualSubmitBtn = document.getElementById('manualSubmitBtn');

// Barcode Generator Modal
const barcodeGeneratorModal = document.getElementById('barcodeGeneratorModal');
const closeBarcodeGenerator = document.getElementById('closeBarcodeGenerator');
const cancelBarcodeBtn = document.getElementById('cancelBarcodeBtn');
const generateBookTitle = document.getElementById('generateBookTitle');
const generateAuthor = document.getElementById('generateAuthor');
const generateYear = document.getElementById('generateYear');
const generateCategory = document.getElementById('generateCategory');
const generateQuantity = document.getElementById('generateQuantity');
const generatePublisher = document.getElementById('generatePublisher');
const barcodeGeneratorError = document.getElementById('barcodeGeneratorError');
const barcodeGeneratorSuccess = document.getElementById('barcodeGeneratorSuccess');
const barcodeCanvas = document.getElementById('barcodeCanvas');
const barcodeCanvasContainer = document.getElementById('barcodeCanvasContainer');
const barcodePlaceholder = document.getElementById('barcodePlaceholder');
const barcodeText = document.getElementById('barcodeText');
const generateBarcodeBtn = document.getElementById('generateBarcodeBtn');
const downloadBarcodeBtn = document.getElementById('downloadBarcodeBtn');
const useGeneratedBarcodeBtn = document.getElementById('useGeneratedBarcodeBtn');

// Book Copy Modal
const bookCopyModal = document.getElementById('bookCopyModal');
const closeCopyModal = document.getElementById('closeCopyModal');
const cancelCopyBtn = document.getElementById('cancelCopyBtn');
const confirmCopyBtn = document.getElementById('confirmCopyBtn');
const copyBookTitle = document.getElementById('copyBookTitle');
const copyBookAuthor = document.getElementById('copyBookAuthor');
const copyCount = document.getElementById('copyCount');
const copySelect = document.getElementById('copySelect');
const copyModalError = document.getElementById('copyModalError');

// Global Variables
let currentBookToEdit = null;
let currentRentalToReturn = null;
let currentBookForRent = null;
let books = [];
let users = [];
let rentals = [];
let booksUnsubscribe = null;
let usersUnsubscribe = null;
let rentalsUnsubscribe = null;
let scannerStream = null;
let barcodeDetector = null;
let currentScannerContext = 'addBook'; // 'addBook', 'rentBook', 'returnBook'
let generatedBarcode = '';
let generatedBookData = null;

// ========== UTILITY FUNCTIONS ==========
function showLogin() {
    loginPage.style.display = 'flex';
    dashboardPage.style.display = 'none';
    emailInput.value = '';
    passwordInput.value = '';
    loginError.style.display = 'none';
}

function showDashboard(user) {
    loginPage.style.display = 'none';
    dashboardPage.style.display = 'block';
    userEmail.textContent = user.email;
    
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDate.textContent = now.toLocaleDateString('en-US', options);
    
    loadDashboardData();
    initBarcodeScanner();
}

function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
    setTimeout(() => element.style.display = 'none', 5000);
}

function showSuccess(element, message) {
    element.textContent = message;
    element.style.display = 'block';
    setTimeout(() => element.style.display = 'none', 5000);
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = dateString.toDate ? dateString.toDate() : new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function daysBetween(date1, date2) {
    const d1 = date1.toDate ? date1.toDate() : new Date(date1);
    const d2 = date2.toDate ? date2.toDate() : new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function handleError(context, error) {
    console.error(`Error in ${context}:`, error);
    alert(`Error: ${error.message || 'Something went wrong. Please try again.'}`);
}

function generateBookNumbers(baseNumber, quantity) {
    const numbers = [];
    const prefix = baseNumber || 'LIB';
    for (let i = 1; i <= quantity; i++) {
        numbers.push(`${prefix}-${i.toString().padStart(3, '0')}`);
    }
    return numbers;
}

function generateUniqueBarcode(bookTitle, author, year, category) {
    const str = `${bookTitle}-${author}-${year}-${category}-${Date.now()}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    
    const baseCode = Math.abs(hash).toString().padStart(12, '0').substring(0, 12);
    
    let sum = 0;
    for (let i = 0; i < baseCode.length; i++) {
        const digit = parseInt(baseCode[i]);
        sum += (i % 2 === 0) ? digit : digit * 3;
    }
    const checkDigit = (10 - (sum % 10)) % 10;
    
    return `RAH${baseCode}${checkDigit}`;
}

function generateBarcodeImage(barcode) {
    try {
        JsBarcode(barcodeCanvas, barcode, {
            format: "CODE128",
            width: 2,
            height: 120,
            displayValue: true,
            fontSize: 18,
            margin: 15,
            background: "#ffffff",
            lineColor: "#000000",
            textMargin: 10
        });
        
        barcodeCanvasContainer.style.display = 'block';
        barcodePlaceholder.style.display = 'none';
        barcodeText.textContent = barcode;
        return true;
    } catch (error) {
        console.error('Error generating barcode:', error);
        return false;
    }
}

function downloadBarcode(barcode, bookTitle) {
    try {
        const canvas = barcodeCanvas;
        const link = document.createElement('a');
        link.download = `Barcode_${bookTitle.replace(/[^a-z0-9]/gi, '_')}_${barcode}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        return true;
    } catch (error) {
        console.error('Error downloading barcode:', error);
        return false;
    }
}

// ========== AUTHENTICATION ==========
auth.onAuthStateChanged((user) => {
    try {
        if (user) {
            const allowedEmails = ['dev@anusrc.lk', 'admin@anusrc.lk', 'principal@anusrc.lk'];
            if (allowedEmails.includes(user.email)) {
                showDashboard(user);
                setupRealtimeListeners();
            } else {
                auth.signOut();
                showError(loginError, 'You are not authorized to access this dashboard.');
            }
        } else {
            showLogin();
            cleanupRealtimeListeners();
        }
    } catch (error) {
        handleError('authStateChanged', error);
    }
});

loginBtn.addEventListener('click', () => {
    try {
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        if (!email || !password) {
            showError(loginError, 'Please enter email and password.');
            return;
        }
        
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => showError(loginError, error.message));
    } catch (error) {
        handleError('login', error);
    }
});

logoutBtn.addEventListener('click', () => auth.signOut());

// ========== REALTIME LISTENERS ==========
function setupRealtimeListeners() {
    try {
        booksUnsubscribe = db.collection('books').onSnapshot(
            (snapshot) => {
                books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                if (document.getElementById('booksSection').classList.contains('active')) {
                    renderBooksTable();
                }
                loadDashboardData();
            },
            (error) => handleError('books listener', error)
        );

        usersUnsubscribe = db.collection('users').onSnapshot(
            (snapshot) => {
                users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                loadDashboardData();
            },
            (error) => handleError('users listener', error)
        );

        rentalsUnsubscribe = db.collection('rentals').onSnapshot(
            (snapshot) => {
                rentals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                if (document.getElementById('rentSection').classList.contains('active')) {
                    renderActiveRentals();
                }
                if (document.getElementById('returnsSection').classList.contains('active')) {
                    renderOverdueBooks();
                }
                loadDashboardData();
            },
            (error) => handleError('rentals listener', error)
        );
    } catch (error) {
        handleError('setupRealtimeListeners', error);
    }
}

function cleanupRealtimeListeners() {
    if (booksUnsubscribe) booksUnsubscribe();
    if (usersUnsubscribe) usersUnsubscribe();
    if (rentalsUnsubscribe) rentalsUnsubscribe();
}

// ========== NAVIGATION ==========
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        try {
            e.preventDefault();
            const target = link.getAttribute('href').substring(1);
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === target + 'Section') {
                    section.classList.add('active');
                }
            });
            
            const actions = {
                'dashboard': loadDashboardData,
                'books': renderBooksTable,
                'rent': () => {
                    renderActiveRentals();
                    const today = new Date().toISOString().split('T')[0];
                    rentDateInput.value = today;
                    const dueDate = new Date();
                    dueDate.setDate(dueDate.getDate() + 14);
                    dueDateInput.value = dueDate.toISOString().split('T')[0];
                },
                'returns': renderOverdueBooks,
                'reports': loadReports
            };
            
            if (actions[target]) actions[target]();
        } catch (error) {
            handleError('navigation', error);
        }
    });
});

// ========== DASHBOARD FUNCTIONS ==========
async function loadDashboardData() {
    try {
        const totalBooksCount = books.reduce((sum, book) => sum + (book.quantity || 1), 0);
        const availableCopiesCount = books.reduce((sum, book) => sum + (book.availableCopies || 0), 0);
        const rentedBooksCount = totalBooksCount - availableCopiesCount;
        const overdueCount = rentals.filter(rental => 
            rental.status === 'active' && rental.dueDate.toDate() < new Date()
        ).length;
        
        totalBooksEl.textContent = totalBooksCount;
        rentedBooksEl.textContent = rentedBooksCount;
        overdueBooksEl.textContent = overdueCount;
        registeredUsersEl.textContent = users.length;
        availableCopiesEl.textContent = availableCopiesCount;
        
        renderRecentRentals();
    } catch (error) {
        handleError('loadDashboardData', error);
    }
}

function renderRecentRentals() {
    try {
        recentRentalsBody.innerHTML = '';
        
        const recentRentals = rentals
            .filter(rental => rental.status === 'active')
            .sort((a, b) => b.rentDate.toDate() - a.rentDate.toDate())
            .slice(0, 10);
        
        if (recentRentals.length === 0) {
            recentRentalsBody.innerHTML = `
                <tr>
                    <td colspan="5" class="empty-state">
                        <i class="fas fa-history"></i>
                        <p>No recent rentals found</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        recentRentals.forEach(rental => {
            const row = document.createElement('tr');
            const dueDate = rental.dueDate.toDate();
            const isOverdue = dueDate < new Date();
            
            row.innerHTML = `
                <td>${rental.admissionNumber}</td>
                <td>${rental.bookTitle} ${rental.bookNumber ? `<small style="color: var(--text-secondary);">(${rental.bookNumber})</small>` : ''}</td>
                <td>${formatDate(rental.rentDate)}</td>
                <td>${formatDate(rental.dueDate)}</td>
                <td><span class="status-badge ${isOverdue ? 'status-overdue' : 'status-rented'}">${isOverdue ? 'Overdue' : 'Active'}</span></td>
            `;
            recentRentalsBody.appendChild(row);
        });
    } catch (error) {
        handleError('renderRecentRentals', error);
    }
}

// ========== BOOKS MANAGEMENT ==========
function renderBooksTable(filteredBooks = null) {
    try {
        booksLoading.style.display = 'block';
        booksTableBody.innerHTML = '';
        booksEmptyState.style.display = 'none';
        
        const booksToRender = filteredBooks || books;
        
        if (booksToRender.length === 0) {
            booksLoading.style.display = 'none';
            booksEmptyState.style.display = 'block';
            return;
        }
        
        booksToRender.forEach(book => {
            const row = document.createElement('tr');
            const availableCopies = book.availableCopies || 0;
            const totalCopies = book.quantity || 1;
            const status = availableCopies > 0 ? 'available' : 'rented';
            const statusText = availableCopies > 0 ? `Available (${availableCopies}/${totalCopies})` : `All Rented (0/${totalCopies})`;
            
            const bookNumbers = book.bookNumbers || [];
            const bookNumbersText = bookNumbers.length > 0 
                ? `<span title="${bookNumbers.join(', ')}">${bookNumbers.length} copies</span>`
                : 'Not specified';
            
            row.innerHTML = `
                <td><code style="background: var(--darker-bg); padding: 5px 10px; border-radius: 5px;">${book.barcode}</code></td>
                <td><strong>${book.title}</strong></td>
                <td>${book.author}</td>
                <td><span class="status-badge" style="background: rgba(52, 152, 219, 0.2); color: var(--primary-color);">${book.category || 'Uncategorized'}</span></td>
                <td>${bookNumbersText}</td>
                <td><span class="status-badge status-${status}">${statusText}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit" onclick="editBook('${book.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="action-btn delete" onclick="deleteBook('${book.id}', '${book.title}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </td>
            `;
            booksTableBody.appendChild(row);
        });
        
        booksLoading.style.display = 'none';
    } catch (error) {
        handleError('renderBooksTable', error);
    }
}

// Search functionality
bookSearchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (!searchTerm) {
        renderBooksTable();
        return;
    }
    
    const filteredBooks = books.filter(book => {
        return (
            (book.title && book.title.toLowerCase().includes(searchTerm)) ||
            (book.author && book.author.toLowerCase().includes(searchTerm)) ||
            (book.barcode && book.barcode.toLowerCase().includes(searchTerm)) ||
            (book.category && book.category.toLowerCase().includes(searchTerm))
        );
    });
    
    renderBooksTable(filteredBooks);
});

// Filter functionality
bookStatusFilter.addEventListener('change', (e) => {
    const status = e.target.value;
    
    if (status === 'all') {
        renderBooksTable();
        return;
    }
    
    const filteredBooks = books.filter(book => {
        const availableCopies = book.availableCopies || 0;
        const totalCopies = book.quantity || 1;
        
        switch(status) {
            case 'available':
                return availableCopies > 0;
            case 'rented':
                return availableCopies === 0;
            case 'damaged':
                return book.status === 'damaged';
            case 'lost':
                return book.status === 'lost';
            default:
                return true;
        }
    });
    
    renderBooksTable(filteredBooks);
});

// Add Book Modal
addBookBtn.addEventListener('click', () => openAddBookModal());
addBookEmptyBtn.addEventListener('click', () => openAddBookModal());

function openAddBookModal(barcode = '') {
    try {
        currentBookToEdit = null;
        modalTitle.innerHTML = '<i class="fas fa-book"></i> Add New Book';
        modalBarcode.value = barcode;
        modalTitleInput.value = '';
        modalAuthor.value = '';
        modalQuantity.value = 1;
        modalbooknumber.value = 'LIB';
        modalPublisher.value = '';
        modalYear.value = new Date().getFullYear();
        modalCategory.value = '';
        modalStatus.value = 'available';
        bookModalError.style.display = 'none';
        bookModal.style.display = 'flex';
        
        modalTitleInput.focus();
    } catch (error) {
        handleError('openAddBookModal', error);
    }
}

// Edit Book
window.editBook = async function(bookId) {
    try {
        const doc = await db.collection('books').doc(bookId).get();
        if (doc.exists) {
            const book = doc.data();
            currentBookToEdit = bookId;
            modalTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Book';
            modalBarcode.value = book.barcode;
            modalTitleInput.value = book.title;
            modalAuthor.value = book.author;
            modalQuantity.value = book.quantity || 1;
            modalbooknumber.value = book.baseBookNumber || 'LIB';
            modalPublisher.value = book.publisher || '';
            modalYear.value = book.year || new Date().getFullYear();
            modalCategory.value = book.category || '';
            modalStatus.value = book.status || 'available';
            bookModalError.style.display = 'none';
            bookModal.style.display = 'flex';
        }
    } catch (error) {
        handleError('editBook', error);
    }
};

// Delete Book
window.deleteBook = async function(bookId, bookTitle) {
    try {
        if (confirm(`Are you sure you want to delete "${bookTitle}" and all its copies? This action cannot be undone.`)) {
            await db.collection('books').doc(bookId).delete();
            showSuccess(null, 'Book deleted successfully.');
        }
    } catch (error) {
        handleError('deleteBook', error);
    }
};

// Save Book
bookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const quantity = parseInt(modalQuantity.value) || 1;
        const baseBookNumber = modalbooknumber.value.trim() || 'LIB';
        
        const bookData = {
            barcode: modalBarcode.value.trim(),
            title: modalTitleInput.value.trim(),
            author: modalAuthor.value.trim(),
            quantity: quantity,
            baseBookNumber: baseBookNumber,
            bookNumbers: generateBookNumbers(baseBookNumber, quantity),
            publisher: modalPublisher.value.trim(),
            year: parseInt(modalYear.value) || new Date().getFullYear(),
            category: modalCategory.value,
            status: modalStatus.value,
            availableCopies: quantity,
            rentedCopies: [],
            updatedAt: new Date().toISOString()
        };
        
        if (!bookData.barcode || !bookData.title || !bookData.author || !bookData.category) {
            showError(bookModalError, 'Please fill in all required fields.');
            return;
        }
        
        if (currentBookToEdit) {
            await db.collection('books').doc(currentBookToEdit).update(bookData);
            showSuccess(bookModalError, 'Book updated successfully!');
        } else {
            // Check for existing book with same title and author
            const existingBookSnapshot = await db.collection('books')
                .where('title', '==', bookData.title)
                .where('author', '==', bookData.author)
                .limit(1)
                .get();
            
            if (!existingBookSnapshot.empty) {
                const existingBookDoc = existingBookSnapshot.docs[0];
                const existingBook = existingBookDoc.data();
                
                // Update existing book with more copies
                const newQuantity = existingBook.quantity + quantity;
                const newBookNumbers = [...(existingBook.bookNumbers || []), ...bookData.bookNumbers];
                
                await db.collection('books').doc(existingBookDoc.id).update({
                    quantity: newQuantity,
                    availableCopies: firebase.firestore.FieldValue.increment(quantity),
                    bookNumbers: newBookNumbers,
                    updatedAt: new Date().toISOString()
                });
                
                showSuccess(bookModalError, `Added ${quantity} copies to existing book.`);
            } else {
                bookData.createdAt = new Date().toISOString();
                await db.collection('books').doc(bookData.barcode).set(bookData);
                showSuccess(bookModalError, 'Book added successfully!');
            }
        }
        
        setTimeout(() => {
            bookModal.style.display = 'none';
            bookModalError.style.display = 'none';
        }, 1500);
    } catch (error) {
        handleError('saveBook', error);
    }
});

closeBookModal.addEventListener('click', () => bookModal.style.display = 'none');
cancelBookBtn.addEventListener('click', () => bookModal.style.display = 'none');

// ========== BARCODE SCANNER FUNCTIONS ==========
function initBarcodeScanner() {
    if ('BarcodeDetector' in window) {
        try {
            barcodeDetector = new BarcodeDetector({ 
                formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39', 'code_93', 'codabar'] 
            });
        } catch (error) {
            console.error('BarcodeDetector initialization error:', error);
        }
    }
}

async function getCameras() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        cameraSelect.innerHTML = '<option value="">Select Camera...</option>';
        videoDevices.forEach((device, index) => {
            const option = document.createElement('option');
            option.value = device.deviceId;
            option.text = device.label || `Camera ${index + 1}`;
            cameraSelect.appendChild(option);
        });
        
        return videoDevices.length > 0;
    } catch (error) {
        console.error('Error getting cameras:', error);
        return false;
    }
}

async function startCamera(deviceId = '') {
    stopCamera();
    
    try {
        const constraints = {
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: 'environment'
            }
        };
        
        if (deviceId) constraints.video.deviceId = { exact: deviceId };
        
        scannerStream = await navigator.mediaDevices.getUserMedia(constraints);
        scannerVideo.srcObject = scannerStream;
        scannerVideo.play();
        
        detectBarcodes();
        return true;
    } catch (error) {
        alert('Cannot access camera. Please check permissions and ensure no other app is using the camera.');
        return false;
    }
}

function stopCamera() {
    if (scannerStream) {
        scannerStream.getTracks().forEach(track => track.stop());
        scannerStream = null;
    }
    if (scannerVideo.srcObject) scannerVideo.srcObject = null;
}

async function detectBarcodes() {
    if (!barcodeDetector || !scannerVideo.srcObject) return;
    
    try {
        const barcodes = await barcodeDetector.detect(scannerVideo);
        
        if (barcodes.length > 0) {
            const barcode = barcodes[0];
            showBarcodeResult(barcode.rawValue);
        } else {
            requestAnimationFrame(detectBarcodes);
        }
    } catch (error) {
        setTimeout(() => detectBarcodes(), 100);
    }
}

function showBarcodeResult(barcode) {
    detectedBarcodeSpan.textContent = barcode;
    scannerResult.style.display = 'block';
    stopCamera();
}

function resetScanner() {
    scannerResult.style.display = 'none';
    detectedBarcodeSpan.textContent = '';
    manualBarcodeInput.value = '';
    startCamera(cameraSelect.value);
}

function useDetectedBarcode(barcode) {
    let targetInput = null;
    
    switch(currentScannerContext) {
        case 'addBook':
            targetInput = modalBarcode;
            break;
        case 'rentBook':
            targetInput = bookBarcodeInput;
            break;
        case 'returnBook':
            targetInput = returnBarcodeInput;
            break;
    }
    
    if (targetInput) {
        targetInput.value = barcode;
        targetInput.focus();
        
        // Auto-trigger check for rent and return contexts
        if (currentScannerContext === 'rentBook' && bookBarcodeInput.value) {
            setTimeout(() => checkBookBtn.click(), 500);
        } else if (currentScannerContext === 'returnBook' && returnBarcodeInput.value) {
            setTimeout(() => checkReturnBtn.click(), 500);
        }
    }
    
    barcodeScannerModal.style.display = 'none';
    stopCamera();
}

async function openBarcodeScanner(context = 'addBook') {
    currentScannerContext = context;
    
    scannerResult.style.display = 'none';
    detectedBarcodeSpan.textContent = '';
    manualBarcodeInput.value = '';
    
    const hasCameras = await getCameras();
    if (hasCameras) {
        barcodeScannerModal.style.display = 'flex';
        setTimeout(() => startCamera(), 100);
    } else {
        alert('No cameras found. Please check your device.');
    }
}

// Scanner Event Listeners
closeScannerModal.addEventListener('click', () => {
    barcodeScannerModal.style.display = 'none';
    stopCamera();
});

cameraSelect.addEventListener('change', (e) => {
    if (e.target.value) startCamera(e.target.value);
});

useBarcodeBtn.addEventListener('click', () => {
    const barcode = detectedBarcodeSpan.textContent;
    if (barcode) useDetectedBarcode(barcode);
});

scanAgainBtn.addEventListener('click', resetScanner);

manualSubmitBtn.addEventListener('click', () => {
    const barcode = manualBarcodeInput.value.trim();
    if (barcode) {
        useDetectedBarcode(barcode);
    } else {
        alert('Please enter a barcode');
    }
});

manualBarcodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') manualSubmitBtn.click();
});

// Scanner button event listeners
scanModalBarcodeBtn.addEventListener('click', () => openBarcodeScanner('addBook'));
scanBookBarcodeBtn.addEventListener('click', () => openBarcodeScanner('rentBook'));
scanReturnBarcodeBtn.addEventListener('click', () => openBarcodeScanner('returnBook'));

// ========== BARCODE GENERATOR FUNCTIONS ==========
generateBarcodeToolBtn.addEventListener('click', () => openBarcodeGenerator());
generateModalBarcodeBtn.addEventListener('click', () => {
    // If we're in the add book modal, use existing data
    if (modalTitleInput.value && modalAuthor.value && modalCategory.value) {
        openBarcodeGenerator({
            title: modalTitleInput.value,
            author: modalAuthor.value,
            year: modalYear.value,
            category: modalCategory.value,
            publisher: modalPublisher.value,
            quantity: modalQuantity.value
        });
    } else {
        openBarcodeGenerator();
    }
});

generateBookBarcodeBtn.addEventListener('click', () => openBarcodeGenerator());

function openBarcodeGenerator(prefilledData = null) {
    try {
        // Reset form
        barcodeGeneratorError.style.display = 'none';
        barcodeGeneratorSuccess.style.display = 'none';
        barcodeCanvasContainer.style.display = 'none';
        barcodePlaceholder.style.display = 'block';
        barcodeText.textContent = '';
        generatedBarcode = '';
        generatedBookData = null;
        downloadBarcodeBtn.disabled = true;
        useGeneratedBarcodeBtn.disabled = true;
        
        // Fill with prefilled data if available
        if (prefilledData) {
            generateBookTitle.value = prefilledData.title || '';
            generateAuthor.value = prefilledData.author || '';
            generateYear.value = prefilledData.year || new Date().getFullYear();
            generateCategory.value = prefilledData.category || '';
            generateQuantity.value = prefilledData.quantity || 1;
            generatePublisher.value = prefilledData.publisher || '';
        } else {
            generateBookTitle.value = '';
            generateAuthor.value = '';
            generateYear.value = new Date().getFullYear();
            generateCategory.value = '';
            generateQuantity.value = 1;
            generatePublisher.value = '';
        }
        
        barcodeGeneratorModal.style.display = 'flex';
        generateBookTitle.focus();
    } catch (error) {
        handleError('openBarcodeGenerator', error);
    }
}

// Barcode Generator Button Events
generateBarcodeBtn.addEventListener('click', () => {
    const title = generateBookTitle.value.trim();
    const author = generateAuthor.value.trim();
    const year = generateYear.value || new Date().getFullYear();
    const category = generateCategory.value;
    
    if (!title || !author || !category) {
        showError(barcodeGeneratorError, 'Please fill in Title, Author, and Category.');
        return;
    }
    
    // Generate unique barcode
    generatedBarcode = generateUniqueBarcode(title, author, year, category);
    
    // Store book data
    generatedBookData = {
        title: title,
        author: author,
        year: year,
        category: category,
        publisher: generatePublisher.value,
        quantity: parseInt(generateQuantity.value) || 1
    };
    
    // Generate and display barcode image
    if (generateBarcodeImage(generatedBarcode)) {
        downloadBarcodeBtn.disabled = false;
        useGeneratedBarcodeBtn.disabled = false;
        showSuccess(barcodeGeneratorSuccess, 'Barcode generated successfully!');
    } else {
        showError(barcodeGeneratorError, 'Failed to generate barcode image.');
    }
});

downloadBarcodeBtn.addEventListener('click', () => {
    if (generatedBarcode && generatedBookData) {
        if (downloadBarcode(generatedBarcode, generatedBookData.title)) {
            showSuccess(barcodeGeneratorSuccess, 'Barcode downloaded!');
        }
    }
});

useGeneratedBarcodeBtn.addEventListener('click', () => {
    if (generatedBarcode && generatedBookData) {
        // Close generator modal
        barcodeGeneratorModal.style.display = 'none';
        
        // If book modal is open, fill it
        if (bookModal.style.display === 'flex') {
            modalTitleInput.value = generatedBookData.title;
            modalAuthor.value = generatedBookData.author;
            modalBarcode.value = generatedBarcode;
            modalYear.value = generatedBookData.year;
            modalCategory.value = generatedBookData.category;
            modalPublisher.value = generatedBookData.publisher;
            modalQuantity.value = generatedBookData.quantity;
            
            showSuccess(bookModalError, 'Book details filled from generated barcode!');
        }
        // If we're in rent section, fill it
        else if (document.getElementById('rentSection').classList.contains('active')) {
            bookBarcodeInput.value = generatedBarcode;
            bookTitleInput.value = generatedBookData.title;
            setTimeout(() => checkBookBtn.click(), 500);
            
            showSuccess(rentError, 'Barcode applied! Please check the book.');
        }
    }
});

closeBarcodeGenerator.addEventListener('click', () => {
    barcodeGeneratorModal.style.display = 'none';
});

cancelBarcodeBtn.addEventListener('click', () => {
    barcodeGeneratorModal.style.display = 'none';
});

// ========== RENT BOOK FUNCTIONS ==========
checkUserBtn.addEventListener('click', async () => {
    try {
        const admissionNumber = admissionNumberInput.value.trim();
        if (!admissionNumber) {
            showError(rentError, 'Please enter an admission number.');
            return;
        }
        
        const doc = await db.collection('users').doc(admissionNumber).get();
        if (doc.exists) {
            const user = doc.data();
            userNameInput.value = user.name;
            showSuccess(rentError, `User found: ${user.name} (${user.role})`);
        } else {
            userNameInput.value = '';
            showError(rentError, 'User not found. Please check the admission number.');
        }
    } catch (error) {
        handleError('checkUser', error);
    }
});

checkBookBtn.addEventListener('click', async () => {
    try {
        const barcode = bookBarcodeInput.value.trim();
        if (!barcode) {
            showError(rentError, 'Please enter a book barcode.');
            return;
        }
        
        const doc = await db.collection('books').doc(barcode).get();
        if (doc.exists) {
            const book = doc.data();
            bookTitleInput.value = book.title;
            currentBookForRent = book;
            
            if ((book.availableCopies || 0) <= 0) {
                showError(rentError, 'No copies available for rent.');
                rentBookBtn.disabled = true;
            } else {
                showSuccess(rentError, `Book found: ${book.title} by ${book.author}. ${book.availableCopies} copies available.`);
                
                // If there are multiple copies, open the copy selection modal
                if (book.quantity > 1) {
                    openBookCopyModal(book);
                } else {
                    rentBookBtn.disabled = false;
                }
            }
        } else {
            bookTitleInput.value = '';
            currentBookForRent = null;
            showError(rentError, 'Book not found. Please check the barcode.');
            rentBookBtn.disabled = true;
        }
    } catch (error) {
        handleError('checkBook', error);
    }
});

// Book Copy Selection Modal
function openBookCopyModal(book) {
    try {
        copyBookTitle.textContent = book.title;
        copyBookAuthor.textContent = book.author;
        copyCount.textContent = book.availableCopies || 0;
        
        // Get all book numbers
        const allBookNumbers = book.bookNumbers || [];
        const rentedCopies = book.rentedCopies || [];
        
        // Filter available copies (not in rentedCopies)
        const availableBookNumbers = allBookNumbers.filter(num => !rentedCopies.includes(num));
        
        // Populate dropdown with available copies
        copySelect.innerHTML = '<option value="">Select a book copy...</option>';
        availableBookNumbers.forEach(bookNumber => {
            const option = document.createElement('option');
            option.value = bookNumber;
            option.textContent = bookNumber;
            copySelect.appendChild(option);
        });
        
        copyModalError.style.display = 'none';
        bookCopyModal.style.display = 'flex';
        
        // Clear any previous event listeners
        const newConfirmBtn = confirmCopyBtn.cloneNode(true);
        confirmCopyBtn.parentNode.replaceChild(newConfirmBtn, confirmCopyBtn);
        
        // Store selected book copy
        copySelect.addEventListener('change', (e) => {
            currentBookForRent.selectedCopy = e.target.value;
        });
        
        // Confirm button
        newConfirmBtn.addEventListener('click', () => {
            if (!currentBookForRent.selectedCopy) {
                showError(copyModalError, 'Please select a book copy.');
                return;
            }
            
            bookCopyModal.style.display = 'none';
            rentBookBtn.disabled = false;
            showSuccess(rentError, `Selected copy: ${currentBookForRent.selectedCopy}. Ready to rent.`);
        });
        
    } catch (error) {
        handleError('openBookCopyModal', error);
    }
}

rentBookBtn.addEventListener('click', async () => {
    try {
        const admissionNumber = admissionNumberInput.value.trim();
        const barcode = bookBarcodeInput.value.trim();
        const rentDate = rentDateInput.value;
        const dueDate = dueDateInput.value;
        
        if (!admissionNumber || !barcode || !rentDate || !dueDate) {
            showError(rentError, 'Please fill in all required fields.');
            return;
        }
        
        if (!userNameInput.value || !bookTitleInput.value) {
            showError(rentError, 'Please check user and book first.');
            return;
        }
        
        const bookDoc = await db.collection('books').doc(barcode).get();
        const book = bookDoc.data();
        
        if (!bookDoc.exists || (book.availableCopies || 0) <= 0) {
            showError(rentError, 'Book is no longer available for rent.');
            return;
        }
        
        // Check if user already has this book rented
        const existingRental = await db.collection('rentals')
            .where('admissionNumber', '==', admissionNumber)
            .where('barcode', '==', barcode)
            .where('status', '==', 'active')
            .get();
        
        if (!existingRental.empty) {
            showError(rentError, 'This user already has this book rented.');
            return;
        }
        
        // Determine which book copy to rent
        let bookNumber = '';
        if (currentBookForRent && currentBookForRent.selectedCopy) {
            bookNumber = currentBookForRent.selectedCopy;
        } else if (book.quantity === 1) {
            bookNumber = book.bookNumbers ? book.bookNumbers[0] : '';
        }
        
        const rentalData = {
            admissionNumber: admissionNumber,
            userName: userNameInput.value,
            barcode: barcode,
            bookNumber: bookNumber,
            bookTitle: bookTitleInput.value,
            rentDate: new Date(rentDate),
            dueDate: new Date(dueDate),
            status: 'active',
            createdAt: new Date().toISOString()
        };
        
        // Update book availability
        const updateData = {
            availableCopies: firebase.firestore.FieldValue.increment(-1),
            updatedAt: new Date().toISOString()
        };
        
        // If there's a specific book number, add it to rentedCopies array
        if (bookNumber) {
            updateData.rentedCopies = firebase.firestore.FieldValue.arrayUnion(bookNumber);
        }
        
        await db.collection('books').doc(barcode).update(updateData);
        
        await db.collection('rentals').add(rentalData);
        
        showSuccess(rentSuccess, `Book rented successfully! ${bookNumber ? `Copy: ${bookNumber}` : ''}`);
        
        // Reset form
        admissionNumberInput.value = '';
        userNameInput.value = '';
        bookBarcodeInput.value = '';
        bookTitleInput.value = '';
        currentBookForRent = null;
        rentBookBtn.disabled = true;
    } catch (error) {
        handleError('rentBook', error);
    }
});

function renderActiveRentals() {
    try {
        activeRentalsBody.innerHTML = '';
        const activeRentals = rentals.filter(rental => rental.status === 'active');
        
        if (activeRentals.length === 0) {
            activeRentalsBody.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-state">
                        <i class="fas fa-clock"></i>
                        <p>No active rentals found</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        activeRentals.forEach(rental => {
            const row = document.createElement('tr');
            const dueDate = rental.dueDate.toDate();
            const today = new Date();
            const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
            const daysLeftText = daysLeft > 0 ? `${daysLeft} days` : 'Overdue';
            const isOverdue = daysLeft < 0;
            
            row.innerHTML = `
                <td>${rental.admissionNumber}</td>
                <td>${rental.bookTitle}</td>
                <td>${rental.bookNumber || 'N/A'}</td>
                <td>${formatDate(rental.rentDate)}</td>
                <td>${formatDate(rental.dueDate)}</td>
                <td><span class="${isOverdue ? 'status-overdue' : ''}">${daysLeftText}</span></td>
                <td>
                    <button class="action-btn edit" onclick="prepareReturn('${rental.id}')">
                        <i class="fas fa-undo"></i> Return
                    </button>
                </td>
            `;
            activeRentalsBody.appendChild(row);
        });
    } catch (error) {
        handleError('renderActiveRentals', error);
    }
}

// ========== RETURNS & OVERDUE ==========
function renderOverdueBooks() {
    try {
        overdueTableBody.innerHTML = '';
        const today = new Date();
        const overdueRentals = rentals.filter(rental => 
            rental.status === 'active' && rental.dueDate.toDate() < today
        );
        
        if (overdueRentals.length === 0) {
            overdueTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-state">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>No overdue books found</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        overdueRentals.forEach(rental => {
            const row = document.createElement('tr');
            const dueDate = rental.dueDate.toDate();
            const daysOverdue = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
            
            row.innerHTML = `
                <td>${rental.admissionNumber}</td>
                <td>${rental.userName}</td>
                <td>${rental.bookTitle}</td>
                <td>${rental.bookNumber || 'N/A'}</td>
                <td>${formatDate(rental.dueDate)}</td>
                <td><span class="status-overdue">${daysOverdue} days</span></td>
                <td>
                    <button class="action-btn edit" onclick="prepareReturn('${rental.id}')">
                        <i class="fas fa-undo"></i> Return
                    </button>
                </td>
            `;
            overdueTableBody.appendChild(row);
        });
    } catch (error) {
        handleError('renderOverdueBooks', error);
    }
}

checkReturnBtn.addEventListener('click', async () => {
    try {
        const barcode = returnBarcodeInput.value.trim();
        if (!barcode) {
            showError(returnError, 'Please enter a book barcode.');
            return;
        }
        
        const snapshot = await db.collection('rentals')
            .where('barcode', '==', barcode)
            .where('status', '==', 'active')
            .get();
        
        if (snapshot.empty) {
            showError(returnError, 'No active rental found for this book.');
            returnAdmissionInput.value = '';
            returnBookBtn.disabled = true;
            return;
        }
        
        const doc = snapshot.docs[0];
        const rental = doc.data();
        currentRentalToReturn = doc.id;
        
        returnAdmissionInput.value = rental.admissionNumber;
        showSuccess(returnError, `Book found! Rented by ${rental.userName}. ${rental.bookNumber ? `Copy: ${rental.bookNumber}` : ''}. Due date: ${formatDate(rental.dueDate)}`);
        returnBookBtn.disabled = false;
    } catch (error) {
        handleError('checkReturn', error);
    }
});

window.prepareReturn = async function(rentalId) {
    try {
        const doc = await db.collection('rentals').doc(rentalId).get();
        if (doc.exists) {
            const rental = doc.data();
            currentRentalToReturn = rentalId;
            
            const dueDate = rental.dueDate.toDate();
            const today = new Date();
            const daysOverdue = Math.max(0, Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24)));
            
            confirmUserName.textContent = rental.userName;
            confirmBookTitle.textContent = `${rental.bookTitle} ${rental.bookNumber ? `(${rental.bookNumber})` : ''}`;
            confirmRentDate.textContent = formatDate(rental.rentDate);
            confirmDueDate.textContent = formatDate(rental.dueDate);
            confirmDaysOverdue.textContent = daysOverdue > 0 ? `${daysOverdue} days` : 'Not overdue';
            
            returnModalError.style.display = 'none';
            returnModal.style.display = 'flex';
        }
    } catch (error) {
        handleError('prepareReturn', error);
    }
};

confirmReturnBtn.addEventListener('click', async () => {
    try {
        if (!currentRentalToReturn) {
            showError(returnModalError, 'No rental selected for return.');
            return;
        }
        
        const rentalDoc = await db.collection('rentals').doc(currentRentalToReturn).get();
        const rental = rentalDoc.data();
        
        // Update rental status
        await db.collection('rentals').doc(currentRentalToReturn).update({
            status: 'returned',
            returnDate: new Date().toISOString()
        });
        
        // Update book availability
        const updateData = {
            availableCopies: firebase.firestore.FieldValue.increment(1),
            updatedAt: new Date().toISOString()
        };
        
        // If there's a specific book number, remove it from rentedCopies array
        if (rental.bookNumber) {
            updateData.rentedCopies = firebase.firestore.FieldValue.arrayRemove(rental.bookNumber);
        }
        
        await db.collection('books').doc(rental.barcode).update(updateData);
        
        showSuccess(returnModalError, 'Book returned successfully!');
        
        setTimeout(() => {
            returnModal.style.display = 'none';
            returnBarcodeInput.value = '';
            returnAdmissionInput.value = '';
            returnBookBtn.disabled = true;
            currentRentalToReturn = null;
        }, 1500);
    } catch (error) {
        handleError('confirmReturn', error);
    }
});

returnBookBtn.addEventListener('click', () => {
    if (currentRentalToReturn) {
        prepareReturn(currentRentalToReturn);
    } else {
        showError(returnError, 'Please check the book first.');
    }
});

closeReturnModal.addEventListener('click', () => returnModal.style.display = 'none');
cancelReturnBtn.addEventListener('click', () => returnModal.style.display = 'none');

// Book Copy Modal Close
closeCopyModal.addEventListener('click', () => bookCopyModal.style.display = 'none');
cancelCopyBtn.addEventListener('click', () => bookCopyModal.style.display = 'none');

// ========== REPORTS ==========
async function loadReports() {
    try {
        const booksSnapshot = await db.collection('books').get();
        const usersSnapshot = await db.collection('users').get();
        const rentalsSnapshot = await db.collection('rentals').get();
        
        let totalBooks = 0;
        let availableBooksCount = 0;
        
        booksSnapshot.forEach(doc => {
            const book = doc.data();
            const quantity = book.quantity || 1;
            const availableCopies = book.availableCopies || 0;
            
            totalBooks += quantity;
            availableBooksCount += availableCopies;
        });
        
        const rentedBooksCount = totalBooks - availableBooksCount;
        
        reportTotalBooks.textContent = totalBooks;
        availableBooks.textContent = availableBooksCount;
        reportRentedBooks.textContent = rentedBooksCount;
        activeUsers.textContent = usersSnapshot.size;
        
        // Category breakdown
        const categories = {};
        booksSnapshot.forEach(doc => {
            const book = doc.data();
            const category = book.category || 'Uncategorized';
            const quantity = book.quantity || 1;
            const availableCopies = book.availableCopies || 0;
            
            if (!categories[category]) {
                categories[category] = { total: 0, available: 0, rented: 0 };
            }
            
            categories[category].total += quantity;
            categories[category].available += availableCopies;
            categories[category].rented += (quantity - availableCopies);
        });
        
        categoryTableBody.innerHTML = '';
        for (const [category, stats] of Object.entries(categories)) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${category}</strong></td>
                <td>${stats.total}</td>
                <td>${stats.available}</td>
                <td>${stats.rented}</td>
            `;
            categoryTableBody.appendChild(row);
        }
        
        // Popular books
        const bookRentalCount = {};
        rentalsSnapshot.forEach(doc => {
            const rental = doc.data();
            const key = `${rental.bookTitle}|${rental.barcode}`;
            bookRentalCount[key] = (bookRentalCount[key] || 0) + 1;
        });
        
        const popularBooks = Object.entries(bookRentalCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
        
        popularBooksBody.innerHTML = '';
        popularBooks.forEach(([key, count]) => {
            const [title, barcode] = key.split('|');
            
            let currentlyRented = false;
            rentalsSnapshot.forEach(doc => {
                const rental = doc.data();
                if (rental.barcode === barcode && rental.status === 'active') {
                    currentlyRented = true;
                }
            });
            
            let author = 'Unknown';
            booksSnapshot.forEach(doc => {
                const book = doc.data();
                if (book.barcode === barcode) {
                    author = book.author;
                }
            });
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${title}</strong></td>
                <td>${author}</td>
                <td><span class="status-badge" style="background: rgba(52, 152, 219, 0.2); color: var(--primary-color);">${count}</span></td>
                <td>${currentlyRented ? '<span class="status-badge status-rented">Yes</span>' : '<span class="status-badge status-available">No</span>'}</td>
            `;
            popularBooksBody.appendChild(row);
        });
        
        if (popularBooks.length === 0) {
            popularBooksBody.innerHTML = `
                <tr>
                    <td colspan="4" class="empty-state">
                        <i class="fas fa-star"></i>
                        <p>No rental history yet</p>
                    </td>
                </tr>
            `;
        }
    } catch (error) {
        handleError('loadReports', error);
    }
}

refreshReportsBtn.addEventListener('click', () => loadReports());

// ========== INITIALIZATION ==========
window.addEventListener('load', () => {
    try {
        // Set today's date for rent
        const today = new Date().toISOString().split('T')[0];
        if (rentDateInput) rentDateInput.value = today;
        
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);
        if (dueDateInput) dueDateInput.value = dueDate.toISOString().split('T')[0];
        
        // Auto-check functionality
        admissionNumberInput?.addEventListener('blur', () => {
            if (admissionNumberInput.value.trim()) checkUserBtn.click();
        });
        
        bookBarcodeInput?.addEventListener('blur', () => {
            if (bookBarcodeInput.value.trim()) checkBookBtn.click();
        });
        
        returnBarcodeInput?.addEventListener('blur', () => {
            if (returnBarcodeInput.value.trim()) checkReturnBtn.click();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k' && !e.target.matches('input, select, textarea')) {
                e.preventDefault();
                bookSearchInput.focus();
            }
            
            if (e.key === 'Escape') {
                if (bookModal.style.display === 'flex') bookModal.style.display = 'none';
                if (barcodeScannerModal.style.display === 'flex') barcodeScannerModal.style.display = 'none';
                if (barcodeGeneratorModal.style.display === 'flex') barcodeGeneratorModal.style.display = 'none';
                if (returnModal.style.display === 'flex') returnModal.style.display = 'none';
                if (bookCopyModal.style.display === 'flex') bookCopyModal.style.display = 'none';
            }
        });
        
        console.log('Library Management System initialized successfully!');
        
    } catch (error) {
        handleError('initialization', error);
    }
});