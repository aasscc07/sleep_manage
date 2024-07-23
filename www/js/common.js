document.addEventListener('deviceready', function() {
    loadTimes();
    requestNotificationPermission();
}, false);

function saveTimes() {
    const morningTime = document.getElementById('morning-time').value;
    const eveningTime = document.getElementById('evening-time').value;

    console.log("Save button clicked");
    console.log("Morning Time: ", morningTime);
    console.log("Evening Time: ", eveningTime);

    if (morningTime && eveningTime) {
        localStorage.setItem('morningTime', morningTime);
        localStorage.setItem('eveningTime', eveningTime);
        scheduleNotifications(morningTime, eveningTime);
        alert('수면 시간이 저장되었습니다.');
    } else {
        alert('아침 시간과 저녁 시간을 모두 입력하세요.');
    }
}

function loadTimes() {
    const morningTime = localStorage.getItem('morningTime');
    const eveningTime = localStorage.getItem('eveningTime');

    if (morningTime) {
        document.getElementById('morning-time').value = morningTime;
    }
    if (eveningTime) {
        document.getElementById('evening-time').value = eveningTime;
    }
}

function scheduleNotifications(morningTime, eveningTime) {
    console.log("Scheduling notifications");
    scheduleNotification(morningTime, '아침에 일어날 시간입니다.');
    scheduleNotification(eveningTime, '지금은 잠자리에 들 시간입니다.');
}

function scheduleNotification(time, message) {
    const [hours, minutes] = time.split(':');
    const notificationTime = new Date();
    notificationTime.setHours(hours);
    notificationTime.setMinutes(minutes);
    notificationTime.setSeconds(0);

    const now = new Date();
    if (notificationTime < now) {
        notificationTime.setDate(notificationTime.getDate() + 1);
    }

    console.log("Notification scheduled for: ", notificationTime);

    cordova.plugins.notification.local.schedule({
        title: '수면 알림',
        text: message,
        trigger: { at: notificationTime },
        sound: 'file://alarm-sound.mp3'
    });
}
