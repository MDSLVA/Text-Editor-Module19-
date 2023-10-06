const butInstall = document.getElementById('buttonInstall');

let deferredPrompt; // Store the deferred prompt event

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default browser prompt from showing
  event.preventDefault();
  // Store the event for later use
  deferredPrompt = event;

  // Show your custom install button
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the browser's install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const userChoice = await deferredPrompt.userChoice;

    if (userChoice.outcome === 'accepted') {
      console.log('PWA installation accepted');
    } else {
      console.log('PWA installation rejected');
    }

    // Reset the deferredPrompt variable
    deferredPrompt = null;

    // Hide the custom install button
    butInstall.style.display = 'none';
  }
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed on the device');
});
