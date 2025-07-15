import { Monitor, Triangle, Circle } from 'lucide-react';

export const supportTopics = [
  {
    id: 'app-never-opens',
    title: 'App never opens',
    shortTitle: 'App never opens',
    icon: Triangle,
    description: 'When the app fails to start at all',
    sections: [
      {
        title: 'If you see an error as soon as you try to open the app',
        content: [
          'Make sure the drive is fully connected and showing up on your computer.',
          'If it still doesn\'t work, try it on another computer.',
          'If the app continues to fail, please contact the company where you got the drive.'
        ]
      },
      {
        title: 'If your computer has antivirus/security software or you\'re using a work/corporate computer',
        content: [
          'Antivirus or security software may be blocking the app. You can check if the app was blocked and ask your IT person or department for help.',
          'Work or corporate computers may not allow access to USB drives or update servers. Try using the drive on a different computer, such as a personal laptop.',
          'The drive is write-protected to prevent these systems from changing or deleting its contents.'
        ]
      }
    ]
  },
  {
    id: 'app-opens-cannot-continue',
    title: 'App opens initially, but cannot continue',
    shortTitle: 'App opens but cannot continue',
    icon: Monitor,
    description: 'Issues when the app starts but encounters problems',
    sections: [
      {
        title: 'App opens, shows an immediate error',
        content: [
          'Please check for updates. If there are no updates available, please send a diagnostic to the manufacturer, as they may be able to provide an update.'
        ]
      },
      {
        title: 'Red Screen',
        content: [
          'A valid USB drive purchased from the company where this software was developed must be used to access the data contained.',
          'If you are certain that the USB drive is securely plugged into a working USB port, and the USB drive fully initiated and is visible on your computer:',
          'If the red screen still appears then the drive may be faulty or damaged:',
          'Check for updates.',
          'Send a diagnostic report to the manufacturer, they may be able to provide an update quickly.',
          'If none of these steps help you open the app, please contact the company where you got the drive, report your support code and request a software update.'
        ]
      }
    ]
  },
  {
    id: 'none-of-these-help',
    title: 'If none of these steps help',
    shortTitle: 'None of these steps help',
    icon: Circle,
    description: 'Additional support options when other solutions don\'t work',
    sections: [
      {
        title: 'Additional Support Steps',
        content: [
          'If no updates are available, please send a diagnostic report to the manufacturer.',
          'Then, contact the company where you got the drive and let them know about your experience.'
        ]
      }
    ]
  }
];