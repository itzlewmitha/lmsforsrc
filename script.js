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

// Books Management
const booksTableBody = document.getElementById('booksTableBody');
const booksLoading = document.getElementById('booksLoading');
const addBookBtn = document.getElementById('addBookBtn');
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

// Barcode Scanner Elements
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

// NEW: Book Copy Selection Modal
const bookCopyModal = document.createElement('div');
bookCopyModal.className = 'modal';
bookCopyModal.innerHTML = `
    <div class="modal-content">
        <button class="modal-close" id="closeCopyModal">&times;</button>
        <div class="modal-header">
            <h3>Select Book Copy</h3>
        </div>
        <div id="copyModalError" class="error-message"></div>
        <div style="margin-bottom: 20px;">
            <p><strong>Book:</strong> <span id="copyBookTitle"></span></p>
            <p><strong>Author:</strong> <span id="copyBookAuthor"></span></p>
            <p><strong>Available Copies:</strong> <span id="copyCount"></span></p>
        </div>
        <div style="margin-bottom: 20px;">
            <label for="copySelect">Select Book Number:</label>
            <select id="copySelect" style="width: 100%; padding: 10px; margin-top: 5px;">
                <option value="">Select a book copy...</option>
            </select>
        </div>
        <div class="form-buttons">
            <button type="button" id="cancelCopyBtn" class="btn btn-danger">Cancel</button>
            <button type="button" id="confirmCopyBtn" class="btn">Select & Continue</button>
        </div>
    </div>
`;
document.body.appendChild(bookCopyModal);

// Global Variables
let currentBookToEdit = null;
let currentRentalToReturn = null;
let currentBookForRent = null; // Store book data when preparing to rent
let books = [];
let users = [];
let rentals = [];
let booksUnsubscribe = null;
let usersUnsubscribe = null;
let rentalsUnsubscribe = null;
let scannerStream = null;
let barcodeDetector = null;
let currentScannerContext = 'addBook';
let availableCopies = []; // Store available book copies for selection

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

// Generate unique book numbers for each copy
function generateBookNumbers(baseNumber, quantity) {
    const numbers = [];
    for (let i = 1; i <= quantity; i++) {
        numbers.push(`${baseNumber}-COPY${i.toString().padStart(2, '0')}`);
    }
    return numbers;
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
            
            // Load section data
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
        
        // Update available copies stat
        document.getElementById('availableCopies').textContent = availableCopiesCount;
        
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
            recentRentalsBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 30px;">No recent rentals found</td></tr>';
            return;
        }
        
        recentRentals.forEach(rental => {
            const row = document.createElement('tr');
            const dueDate = rental.dueDate.toDate();
            const isOverdue = dueDate < new Date();
            
            row.innerHTML = `
                <td>${rental.admissionNumber}</td>
                <td>${rental.bookTitle} ${rental.bookNumber ? `(${rental.bookNumber})` : ''}</td>
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
function renderBooksTable() {
    try {
        booksLoading.style.display = 'block';
        booksTableBody.innerHTML = '';
        
        if (books.length === 0) {
            booksTableBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 30px;">No books found. Add your first book!</td></tr>';
            booksLoading.style.display = 'none';
            return;
        }
        
        books.forEach(book => {
            const row = document.createElement('tr');
            const availableCopies = book.availableCopies || 0;
            const totalCopies = book.quantity || 1;
            const status = availableCopies > 0 ? 'available' : 'rented';
            const statusText = availableCopies > 0 ? `Available (${availableCopies}/${totalCopies})` : `All Rented (0/${totalCopies})`;
            
            // Get book numbers array
            const bookNumbers = book.bookNumbers || [];
            const bookNumbersText = bookNumbers.length > 0 ? bookNumbers.join(', ') : 'Not specified';
            
            row.innerHTML = `
                <td>${book.barcode}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.category || 'Uncategorized'}</td>
                <td>${bookNumbersText}</td>
                <td><span class="status-badge status-${status}">${statusText}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit" onclick="editBook('${book.id}')">Edit</button>
                        <button class="action-btn delete" onclick="deleteBook('${book.id}', '${book.title}')">Delete</button>
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

// Add Book Modal
addBookBtn.addEventListener('click', () => openAddBookModal());

function openAddBookModal(barcode = '') {
    try {
        currentBookToEdit = null;
        modalTitle.textContent = 'Add New Book';
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
            modalTitle.textContent = 'Edit Book';
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
        if (confirm(`Are you sure you want to delete "${bookTitle}" and all its copies?`)) {
            await db.collection('books').doc(bookId).delete();
            alert('Book deleted successfully.');
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
            availableCopies: quantity, // All copies available initially
            rentedCopies: [], // Array to track which copies are rented
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
                    bookNumbers: newBookNumbers
                });
                
                showSuccess(bookModalError, `Added ${quantity} copies to existing book.`);
            } else {
                bookData.createdAt = new Date().toISOString();
                await db.collection('books').doc(bookData.barcode).set(bookData);
                showSuccess(bookModalError, 'Book added successfully!');
            }
        }
        
        setTimeout(() => bookModal.style.display = 'none', 1500);
    } catch (error) {
        handleError('saveBook', error);
    }
});

closeBookModal.addEventListener('click', () => bookModal.style.display = 'none');
cancelBookBtn.addEventListener('click', () => bookModal.style.display = 'none');

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
                // Show available copies for selection
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

// NEW: Book Copy Selection Modal
function openBookCopyModal(book) {
    try {
        const copyBookTitle = document.getElementById('copyBookTitle');
        const copyBookAuthor = document.getElementById('copyBookAuthor');
        const copyCount = document.getElementById('copyCount');
        const copySelect = document.getElementById('copySelect');
        const copyModalError = document.getElementById('copyModalError');
        
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
        
        // Store selected book copy
        let selectedCopy = null;
        copySelect.addEventListener('change', (e) => {
            selectedCopy = e.target.value;
        });
        
        // Confirm button
        document.getElementById('confirmCopyBtn').onclick = () => {
            if (!selectedCopy) {
                showError(copyModalError, 'Please select a book copy.');
                return;
            }
            
            // Store the selected copy for rental
            currentBookForRent.selectedCopy = selectedCopy;
            bookCopyModal.style.display = 'none';
            rentBookBtn.disabled = false;
            showSuccess(rentError, `Selected copy: ${selectedCopy}. Ready to rent.`);
        };
        
        // Cancel button
        document.getElementById('cancelCopyBtn').onclick = () => {
            bookCopyModal.style.display = 'none';
        };
        
        // Close button
        document.getElementById('closeCopyModal').onclick = () => {
            bookCopyModal.style.display = 'none';
        };
        
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
            availableCopies: firebase.firestore.FieldValue.increment(-1)
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
            activeRentalsBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 30px;">No active rentals found</td></tr>';
            return;
        }
        
        activeRentals.forEach(rental => {
            const row = document.createElement('tr');
            const dueDate = rental.dueDate.toDate();
            const today = new Date();
            const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
            const daysLeftText = daysLeft > 0 ? `${daysLeft} days` : 'Overdue';
            
            row.innerHTML = `
                <td>${rental.admissionNumber}</td>
                <td>${rental.bookTitle} ${rental.bookNumber ? `(${rental.bookNumber})` : ''}</td>
                <td>${formatDate(rental.rentDate)}</td>
                <td>${formatDate(rental.dueDate)}</td>
                <td><span class="${daysLeft <= 3 ? 'status-overdue' : ''}">${daysLeftText}</span></td>
                <td><button class="action-btn edit" onclick="prepareReturn('${rental.id}')">Return</button></td>
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
            overdueTableBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 30px;">No overdue books found</td></tr>';
            return;
        }
        
        overdueRentals.forEach(rental => {
            const row = document.createElement('tr');
            const dueDate = rental.dueDate.toDate();
            const daysOverdue = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
            
            row.innerHTML = `
                <td>${rental.admissionNumber}</td>
                <td>${rental.userName}</td>
                <td>${rental.bookTitle} ${rental.bookNumber ? `(${rental.bookNumber})` : ''}</td>
                <td>${formatDate(rental.dueDate)}</td>
                <td><span class="status-overdue">${daysOverdue} days</span></td>
                <td><button class="action-btn edit" onclick="prepareReturn('${rental.id}')">Return</button></td>
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
            availableCopies: firebase.firestore.FieldValue.increment(1)
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
                <td>${category}</td>
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
                <td>${title}</td>
                <td>${author}</td>
                <td>${count}</td>
                <td>${currentlyRented ? 'Yes' : 'No'}</td>
            `;
            popularBooksBody.appendChild(row);
        });
        
        if (popularBooks.length === 0) {
            popularBooksBody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 30px;">No rental history yet</td></tr>';
        }
    } catch (error) {
        handleError('loadReports', error);
    }
}

refreshReportsBtn.addEventListener('click', () => loadReports());

// ========== BARCODE SCANNER ==========
function initBarcodeScanner() {
    if ('BarcodeDetector' in window) {
        try {
            barcodeDetector = new BarcodeDetector({ 
                formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39', 'code_93', 'codabar'] 
            });
        } catch (error) {
            console.error('BarcodeDetector error:', error);
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
        alert('Cannot access camera. Please check permissions.');
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
    if (currentScannerContext === 'addBook' && modalBarcode) {
        modalBarcode.value = barcode;
        modalBarcode.focus();
    } else if (currentScannerContext === 'rentBook' && bookBarcodeInput) {
        bookBarcodeInput.value = barcode;
        bookBarcodeInput.focus();
        setTimeout(() => checkBookBtn.click(), 500);
    } else if (currentScannerContext === 'returnBook' && returnBarcodeInput) {
        returnBarcodeInput.value = barcode;
        returnBarcodeInput.focus();
        setTimeout(() => checkReturnBtn.click(), 500);
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

// Add scanner buttons to forms
function addScannerButtons() {
    if (bookBarcodeInput && bookBarcodeInput.parentNode) {
        const scanBtn = document.createElement('button');
        scanBtn.type = 'button';
        scanBtn.className = 'btn';
        scanBtn.innerHTML = '<i class="fas fa-camera"></i> Scan';
        scanBtn.style.marginLeft = '10px';
        scanBtn.onclick = () => openBarcodeScanner('rentBook');
        bookBarcodeInput.parentNode.appendChild(scanBtn);
    }
    
    if (returnBarcodeInput && returnBarcodeInput.parentNode) {
        const scanBtn = document.createElement('button');
        scanBtn.type = 'button';
        scanBtn.className = 'btn';
        scanBtn.innerHTML = '<i class="fas fa-camera"></i> Scan';
        scanBtn.style.marginLeft = '10px';
        scanBtn.onclick = () => openBarcodeScanner('returnBook');
        returnBarcodeInput.parentNode.appendChild(scanBtn);
    }
}

// ========== INITIALIZATION ==========
window.addEventListener('load', () => {
    try {
        const today = new Date().toISOString().split('T')[0];
        if (rentDateInput) rentDateInput.value = today;
        
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);
        if (dueDateInput) dueDateInput.value = dueDate.toISOString().split('T')[0];
        
        addScannerButtons();
        
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
    } catch (error) {
        handleError('initialization', error);
    }
});
