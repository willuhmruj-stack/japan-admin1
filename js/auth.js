// ฟังก์ชันเช็คสถานะล็อกอิน
function checkAuth() {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            if (user) {
                resolve(user);
            } else {
                reject('Not logged in');
            }
        });
    });
}

// ฟังก์ชันออกจากระบบ
function logout() {
    return auth.signOut();
}

// ฟังก์ชันเช็คว่าเป็นแอดมินหรือไม่
async function isAdmin() {
    const user = auth.currentUser;
    if (!user) return false;
    
    try {
        const doc = await db.collection('admins').doc(user.email).get();
        return doc.exists;
    } catch (error) {
        return false;
    }
}
