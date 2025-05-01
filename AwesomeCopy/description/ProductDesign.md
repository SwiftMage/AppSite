# Product Design Documentation

## 1. Product Overview
- **Product name and description:** AwesomeCopy - A macOS clipboard manager designed for efficiency and ease of use.
- **Mission statement and core objectives:** To provide a seamless and powerful clipboard management experience for macOS users, enhancing productivity by simplifying access to and organization of copied content.
- **Key stakeholders and team structure:** [Placeholder: To be filled in, e.g., Developer: Evan Jones]
- **Current version and release cycle:** [Placeholder: e.g., Version 0.1.0 (Alpha), Release cycle: TBD]

## 2. Architecture Overview
- **System architecture diagram:** [Placeholder: To be added - A simple diagram showing the main components like the AppDelegate, ClipboardMonitor, DataStore, and UI.]
- **Key components and their relationships:**
    - `AwesomeCopyApp`: Main application entry point (SwiftUI App lifecycle).
    - `AppDelegate`: Handles application lifecycle events (e.g., applicationDidFinishLaunching) and sets up global resources like the status bar item and clipboard monitoring.
    - `ClipboardMonitor`: Responsible for detecting changes in the system pasteboard (`NSPasteboard.general`).
    - `ClipboardItem`: Data model representing a single item copied to the clipboard (text, image, file path).
    - `DataStore`: Manages the persistence of clipboard history (currently using `UserDefaults`, potentially migrating to Core Data or SwiftData).
    - `ContentView`: Main SwiftUI view displaying the clipboard history.
    - `StatusItemManager`: Manages the application's menu bar icon and menu.
    - `CopyStackWindowController`: Manages the copy stack window that appears when files are copied.
    - `CopyStackView`: SwiftUI view for displaying copied files in a visually appealing way.
- **Third-party dependencies and integrations:** None currently.
- **Deployment architecture:** Standard macOS Application Bundle (`.app`). Distributed via direct download or potentially the Mac App Store in the future.

## 3. Technology Stack
- **Frontend technologies:** SwiftUI for the user interface.
- **Backend technologies:** Swift, AppKit (for `NSPasteboard`, `NSStatusBar`, `NSImage`, etc.), Combine (potentially for reactive updates).
- **DevOps tools and infrastructure:** Xcode build system, Git for version control.
- **Version control and repository structure:** Git repository hosted on [Placeholder: e.g., GitHub/GitLab/Bitbucket]. Standard Xcode project structure.

## 4. Directory Structure
- **Detailed file/folder organization:**
    ```
    AwesomeCopy/
    ├── AwesomeCopy/                      # Main application source code group
    │   ├── AppDelegate.swift             # Application delegate
    │   ├── AwesomeCopyApp.swift          # Main App struct
    │   ├── ClipboardItem.swift           # Data model for clipboard items
    │   ├── ClipboardMonitor.swift        # Monitors clipboard changes
    │   ├── ContentView.swift             # Main UI view
    │   ├── DataStore.swift               # Handles data persistence
    │   ├── StatusItemManager.swift       # Manages menu bar item
    │   ├── CopyStackWindowController.swift # Controls copy stack window
    │   ├── CopyStackView.swift           # UI for copy stack window
    │   ├── CopyStackSettingsView.swift   # Settings for copy stack
    │   ├── Assets.xcassets/              # Images, icons, colors
    │   ├── Info.plist                    # Application properties
    │   └── AwesomeCopy.entitlements      # App sandbox entitlements
    ├── AwesomeCopy.xcodeproj/            # Xcode project file
    └── ProductDesign.md                  # This document
    └── README.md                         # Project README
    ```
- **Key configuration files and their purposes:**
    - `Info.plist`: Contains metadata about the app like bundle ID, version, etc.
    - `AwesomeCopy.entitlements`: Defines the app's sandbox permissions.
- **Naming conventions and organization principles:** Swift standard naming conventions (UpperCamelCase for types, lowerCamelCase for functions/variables). Group files by feature/responsibility within Xcode.
- **Special directories and their functions:** `Assets.xcassets` for managing assets.

## 5. Development Workflow
- **Local development setup instructions:** Clone the repository, open `AwesomeCopy.xcodeproj` in Xcode, build and run (Cmd+R).
- **Branch strategy and PR process:** [Placeholder: Define branching strategy, e.g., Gitflow (main, develop, feature/*) or GitHub Flow. Require PRs for merging to main/develop.]
- **Testing methodology and tools:** [Placeholder: Define testing approach - Unit tests using XCTest, potentially UI tests.]
- **Build and deployment process:** Build using Xcode (Product -> Build). Archive for distribution (Product -> Archive).

## 6. Design System
- **UI/UX guidelines:** Follow Apple's Human Interface Guidelines (HIG) for macOS. Aim for a clean, minimal, and native look and feel.
- **Component library information:** Primarily using standard SwiftUI views. Custom components will be documented here if created.
- **Design tokens and theming:** Use standard macOS system colors and fonts. Adapt automatically to Light/Dark mode.
- **Accessibility standards:** Implement standard accessibility features (VoiceOver labels, dynamic type support).

## 7. Data Models
- **Database schema:** Currently using `UserDefaults` for simplicity. Each item is stored potentially as serialized data. [Placeholder: Detail the `UserDefaults` keys or describe the future Core Data/SwiftData schema.]
- **Key entities and relationships:**
    - `ClipboardItem`:
        - `id`: UUID (Identifiable)
        - `type`: Enum (`text`, `image`, `file`)
        - `content`: String (for text/filepath) or Data (for image)
        - `timestamp`: Date
        - `preview`: Optional pre-rendered preview (e.g., thumbnail for images)
- **Data flow diagrams:** [Placeholder: Add diagram showing data flow from ClipboardMonitor -> DataStore -> ContentView]
- **API endpoints and structure:** Not applicable (local application).

## 8. Feature Documentation
- **Feature catalog with brief descriptions:**
    - Clipboard Monitoring: Automatically captures text, images, and file paths copied to the clipboard.
    - History Display: Shows a list of recent clipboard items in the main window.
    - Menu Bar Access: Provides quick access to history via a status bar item.
    - Persistence: Saves history across app launches.
    - Copy Stack Window: Displays recently copied files in a visually appealing slide-down window.
- **Implementation details for major features:**
    - **Clipboard Monitoring:** Uses `NSPasteboard.general` and a timer to check for changes. Reads available types (`NSPasteboard.PasteboardType`) to determine item type.
    - **Data Storage:** `ClipboardItem` objects are likely encoded to `Data` using `Codable` and stored in `UserDefaults` under a specific key.
    - **Copy Stack Window:** A specialized window that slides down from the top of the screen when files are copied. Features:
        - Animated slide-down with spring effect for a playful feel
        - Automatic hiding after a configurable period of inactivity (default: 10 seconds, adjustable in settings from 2-30 seconds)
        - Stays visible when moused over or interacted with
        - Requires explicit closing via an X button when interacted with
        - Visual effects including subtle glow and hover animations
        - Two view modes: stacked and list view
        - Positioned at the top center of the screen for consistent visibility
- **Feature flags and experimental features:** None currently.
- **Future roadmap items:**
    - Search functionality
    - Pinned/favorite items
    - Direct paste from history
    - Synchronization (iCloud?)
    - Customizable history limit
    - More robust data storage (Core Data/SwiftData)
    - Handling multiple items copied at once
    - Snippet management

## 9. Testing Strategy
- **Unit/integration/E2E testing approach:** Focus on Unit Tests for `DataStore`, `ClipboardMonitor` logic, and `ClipboardItem` model using `XCTest`. Integration tests for interactions between components. UI tests (`XCUIApplication`) for critical user flows.
- **Testing tools and frameworks:** `XCTest`.
- **Test coverage expectations:** [Placeholder: Aim for >70% coverage for core logic.]
- **QA process overview:** Manual testing during development cycles. [Placeholder: Define more formal QA process if needed.]

## 10. Performance Considerations
- **Performance metrics and targets:** App launch time (< 1s), UI responsiveness (smooth scrolling), low background CPU/memory usage.
- **Known bottlenecks and solutions:** Frequent polling of `NSPasteboard` can be inefficient. Consider using lower-level APIs if necessary, or optimizing the polling interval. Large images/data blobs could impact memory and persistence performance.
- **Optimization strategies:** Efficient data encoding/decoding. Lazy loading of data in UI. Thumbnail generation for large images. Limit history size.
- **Monitoring tools:** Xcode Instruments (Time Profiler, Allocations, Energy Log).

## 11. Security Guidelines
- **Authentication and authorization:** Not applicable (local application).
- **Data privacy measures:** Clipboard data is stored locally. User awareness about the nature of clipboard managers is important. Use App Sandbox entitlements correctly.
- **Security best practices:** Validate data read from pasteboard. Avoid executing arbitrary code based on clipboard content. Adhere to App Store security guidelines if distributing there.
- **Compliance requirements:** [Placeholder: e.g., GDPR if handling user data that falls under it, although unlikely for a basic local clipboard manager.]

## 12. Troubleshooting
- **Common issues and solutions:**
    - App not detecting copies: Check sandbox permissions (Accessibility API access might be needed for some advanced monitoring techniques, though not standard polling). Ensure `ClipboardMonitor` timer is running.
    - Data loss: Investigate `DataStore` saving/loading logic. Check `UserDefaults` limits if storing large amounts of data.
    - Copy Stack window not appearing: Check if the `ClipboardManagerDelegate` is properly set up and if the `showCopyStackWindow` method is being called.
    - App crashing when copying files: Fixed in recent updates. The crash was due to the app trying to access a non-existent property on the AppDelegate when positioning the Copy Stack window. The window is now positioned in a more reliable way at the top center of the screen.
    - Window animations jerky: Reduce other applications' CPU usage or simplify animation effects.
    - Window disappearing too quickly: Adjust the auto-hide delay in Settings → Copy Stack tab using the slider (range: 2-30 seconds).
    - Settings window partially hidden: Fixed. The settings window width was increased to accommodate the new sidebar layout, and the positioning logic was improved to ensure the window is fully visible on screen. The window will now position intelligently based on available space, either to the left or right of the popover, or centered if space is limited.
- **Debugging tools and techniques:** Xcode debugger, `print`