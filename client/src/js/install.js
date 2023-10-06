const butInstall = document.getElementById('buttonInstall');

let deferredPrompt; // To store the deferred prompt event

// Logic for installing the PWA

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the browser's default "Add to Home Screen" prompt
  event.preventDefault();
  // Store the event for later use
  deferredPrompt = event;

  // Show a custom install button or UI element
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Check if a deferred prompt event is available
  if (deferredPrompt) {
    // Show the browser's installation prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the PWA installation prompt');
    } else {
      console.log('User declined the PWA installation prompt');
    }

    // Reset the deferredPrompt variable
    deferredPrompt = null;

    // Hide the custom install button or UI element
    butInstall.style.display = 'none';
  }
});

// Add an event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed successfully.');
});
