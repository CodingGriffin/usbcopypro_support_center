# UsbCopyPro Support Center

A modern React-based support center application for UsbCopyPro software, providing update checking, diagnostics, and customer support functionality.

## 🚀 Features

- **Update Checker**: Check for software updates with modal interface
- **Diagnostics System**: Collect and send diagnostic information
- **Support Topics**: Comprehensive help documentation
- **Dark Mode**: Full dark/light theme support
- **Responsive Design**: Mobile-friendly interface
- **Email Integration**: Send diagnostics via email

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Redux with Redux Saga
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **UI Components**: Ant Design

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd UsbcopyproSupportCenter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SERVER_BASE_URL=your_api_base_url
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3001`

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── UpdateCheckerComponent.tsx
│   ├── DiagnosticComponent.tsx
│   ├── HeaderComponent.tsx
│   └── SupportContent.tsx
├── states/              # Redux state management
│   ├── UsbCopyUpdates/
│   │   ├── actions.tsx
│   │   ├── reducer.tsx
│   │   └── saga.tsx
│   ├── reducer.tsx
│   ├── saga.tsx
│   └── store.tsx
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
│   └── axios-client.ts
└── App.tsx
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Components

### UpdateCheckerComponent
- Checks for software updates
- Modal interface with diagnostics options
- Displays available updates in a list
- Handles global loading states

### DiagnosticComponent
- Collects system diagnostic information
- Form for user contact details
- Sends diagnostic reports via API

### SupportContent
- Main application layout
- Integrates all components
- Handles theme switching

## 🔄 State Management

The application uses Redux with Redux Saga for state management:

### Actions
- `CHECK_UPDATES` / `CHECK_GLOBAL_UPDATES` - Check for updates
- `ADD_DIAGNOSTIC` - Send diagnostic information
- `SEND_EMAIL` - Send email notifications

### State Structure
```typescript
{
  usbcopyUpdates: {
    updates: [],
    updatable: {},
    global_updatable: {},
    loading: boolean,
    global_loading: boolean,
    error: null
  }
}
```

## 🎨 Styling

The project uses Tailwind CSS for styling with:
- Dark mode support
- Responsive design
- Custom color schemes
- Smooth transitions

## 📱 Features in Detail

### Update Modal
- Automatically opens when `global_loading` is true
- Checkbox for including diagnostics
- Email input (enabled when diagnostics checked)
- Displays all available updates from array
- Individual download buttons for each update

### Theme Support
- Automatic dark/light mode detection
- Manual theme toggle
- Persistent theme preference
- System preference respect

## 🔌 API Integration

The application integrates with backend APIs for:
- Update checking
- Diagnostic data collection
- Email sending
- File downloads

## 🚀 Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your web server

3. **Configure environment variables** for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for UsbCopyPro.

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: Change port in `vite.config.ts`
2. **API connection issues**: Check `VITE_SERVER_BASE_URL` in `.env`
3. **Build errors**: Clear `node_modules` and reinstall dependencies

### Development Tips

- Use browser dev tools for debugging Redux state
- Check network tab for API call issues
- Use React Developer Tools extension
- Monitor console for error messages

## 📞 Support

For technical support or questions about this application, please contact the development team.
