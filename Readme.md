# Personal Health Tracker App 🏃‍♂️💧😴

A React Native mobile application built with TypeScript for tracking daily health activities including water intake, steps walked, and sleep hours.

## 📱 Features

### Core Functionality

#### 1. Welcome/Onboarding Screen
- Simple app introduction explaining health tracking benefits
- "Get Started" button to proceed to main dashboard
- Clean, user-friendly first-time experience
<img src="https://github.com/KrishnaMoghe/HealthTrackerApp/blob/main/assets/welcomeScreen.jpg" alt="Welcome Screen" width="300" height="auto">


#### 2. Dashboard Screen
- **Today's Date Display** - Shows current date at the top
- **Summary Cards** - Three metric cards showing:
  - 💧 Water intake (glasses consumed today)
  - 👟 Steps walked (total count for the day)
  - 😴 Sleep hours (total sleep logged)
- **Quick Action Buttons** - Fast-access buttons to log each activity type directly
<img src="https://github.com/KrishnaMoghe/HealthTrackerApp/blob/main/assets/Dashboard.jpg" alt="Dashboard Screen" width="300" height="auto">

#### 3. Activity Logging Screen
- Dropdown/picker to select activity type (water, steps, sleep)
- Numeric input field with validation for activity value
- Auto-captured timestamp for when activity is logged
- Optional notes field (max 200 characters)
- **Form Validation**:
  - Water: Must be positive, max 50 glasses
  - Steps: Must be positive number
  - Sleep: Must be between 0-24 hours
- Error messages display inline with TypeScript-typed errors
<img src="https://github.com/KrishnaMoghe/HealthTrackerApp/blob/main/assets/ActivityLogging.jpg" alt="Activity Logging Screen" width="300" height="auto">

#### 4. History Screen
- Lists all logged activities from the last 7 days
- **Pull-to-Refresh** - Swipe down to reload latest data
- Activities grouped by date in descending order
- Each item shows activity icon, value, timestamp, and notes
- Empty state when no activities logged
<img src="https://github.com/KrishnaMoghe/HealthTrackerApp/blob/main/assets/welcomeScreen.jpg" alt="HistoryPage" width="300" height="auto">

## 🛠️ Tech Stack

- **React Native** with **Expo** - Cross-platform mobile framework
- **TypeScript** - Static typing for better code quality
- **React Navigation** - Stack and Tab navigation
- **React Hook Form + Zod** - Type-safe form handling and validation
- **AsyncStorage** - Local data persistence
- **React Native Gesture Handler** - Pull-to-refresh gestures

## 📂 Project Structure

```
health-tracker-app/
├── App.tsx                          # App entry point, navigation setup
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── babel.config.js                  # Babel transpiler config
├── app.json                         # Expo app configuration
├── README.md                        # This file
│
├── assets/                          # Static resources
│   ├── icon.png                     # App icon
│   ├── splash.png                   # Splash screen
│   └── images/                      # Onboarding images
│
└── src/
    ├── navigation/
    │   ├── RootNavigator.tsx        # Root stack (Onboarding → MainTabs)
    │   ├── MainTabNavigator.tsx     # Bottom tabs (Dashboard, History)
    │   └── types.ts                 # Navigation type definitions
    │
    ├── screens/
    │   ├── OnboardingScreen.tsx     # Welcome screen with intro
    │   ├── DashboardScreen.tsx      # Main dashboard with summary cards
    │   ├── ActivityLoggingScreen.tsx # Form to log activities
    │   └── HistoryScreen.tsx        # Last 7 days activity list
    │
    ├── components/
    │   ├── SummaryCard.tsx          # Metric display card (water/steps/sleep)
    │   ├── QuickActionButton.tsx    # Quick log button component
    │   ├── ActivityForm.tsx         # Reusable form with validation
    │   ├── ActivityList.tsx         # Grouped activity list renderer
    │   └── ActivityListItem.tsx     # Single activity row display
    │
    ├── types/
    │   ├── activity.ts              # Activity, ActivityType, DailySummary types
    │   ├── navigation.ts            # Navigation param list types
    │   └── index.ts                 # Type exports barrel file
    │
    ├── utils/
    │   ├── date.ts                  # Date formatting and grouping helpers
    │   ├── summary.ts               # Calculate daily totals from activities
    │   └── validators.ts            # Zod schemas for form validation
    │
    ├── services/
    │   ├── storage.ts               # AsyncStorage wrapper with types
    │   └── activityService.ts       # Business logic for activity operations
    │
    ├── contexts/
    │   └── ActivityContext.tsx      # Global state for activities
    │
    └── hooks/
        ├── useActivities.ts         # Hook to access activity context
        └── usePullToRefresh.ts      # Reusable pull-to-refresh logic
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/health-tracker-app.git
cd health-tracker-app
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npx expo start
```

4. Run on your device:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

## 📸 Screenshots

_Add screenshots of each screen here:_
- Onboarding Screen
- Dashboard with Summary Cards
- Activity Logging Form
- History with Pull-to-Refresh

## 🧪 Testing

```
npm test
```

## 📝 Assignment Requirements Checklist

- ✅ Welcome/Onboarding Screen with proceed button
- ✅ Dashboard with today's date
- ✅ Summary cards for water, steps, sleep
- ✅ Quick action buttons for logging
- ✅ Activity logging form with type, value, time, notes
- ✅ Input validation for all fields
- ✅ History screen showing last 7 days
- ✅ Pull-to-refresh functionality
- ✅ Activities grouped by date
- ✅ TypeScript implementation
- ✅ GitHub repository with README

## 🔮 Future Enhancements

- Charts and graphs for weekly/monthly trends
- Goal setting and progress tracking
- Reminders and notifications
- Data export to CSV
- Dark mode support
- Multi-language support
