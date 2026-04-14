let api = null;

function startCall() {
    const roomName = document.getElementById("roomName").value;

    if (!roomName) {
        alert("Masukkan nama room!");
        return;
    }

    const domain = "meet.jit.si";

    if (api) {
        api.dispose();
    }

    api = new JitsiMeetExternalAPI(domain, {
        roomName: roomName,
        parentNode: document.querySelector("#video-container"),
        width: "100%",
        height: 600,
        configOverwrite: {
            startWithAudioMuted: false,
            startWithVideoMuted: false,
        },
        interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
        },
    });
}