// 請在這裡輸入您的 LIFF ID
const MY_LIFF_ID = '2009715141-G0aFmtrL'; 

async function initializeLiff() {
    try {
        await liff.init({ liffId: MY_LIFF_ID });
        
        // 隱藏載入中畫面
        document.getElementById('loading').classList.add('d-none');

        if (liff.isLoggedIn()) {
            showContent();
        } else {
            showLogin();
        }
    } catch (error) {
        console.error('LIFF 初始化失敗', error);
        alert('系統初始化失敗，請稍後再試。');
    }
}

function showLogin() {
    document.getElementById('login-section').classList.remove('d-none');
}

async function showContent() {
    document.getElementById('content-section').classList.remove('d-none');
    
    try {
        // 獲取使用者資訊
        const profile = await liff.getProfile();
        document.getElementById('user-name').textContent = profile.displayName;
        document.getElementById('user-avatar').src = profile.pictureUrl || 'https://via.placeholder.com/60';
    } catch (error) {
        console.error('獲取使用者資訊失敗', error);
    }
}

// 登入按鈕事件
document.getElementById('btn-login').addEventListener('click', () => {
    if (!liff.isLoggedIn()) {
        liff.login();
    }
});

// 登出按鈕事件
document.getElementById('btn-logout').addEventListener('click', () => {
    if (liff.isLoggedIn()) {
        liff.logout();
        window.location.reload();
    }
});

// 啟動初始化
initializeLiff();
