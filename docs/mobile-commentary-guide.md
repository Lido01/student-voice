# Mobile Commentary Guide

This guide explains the React Native side of Student Voice for collaborators who
need to understand the screen flow before changing it. The file is additive
documentation only and does not affect the running application.

## Mobile app entry

`mobile/App.js` is the main app component. It is responsible for mounting the
navigation structure and any global providers that the app needs. Keep this file
small so the application startup path stays easy to reason about.

When a provider or app-level wrapper is added, document why it must live at the
root. If it is only needed by one screen group, prefer placing it closer to that
screen group instead of wrapping the entire app.

## API boundary

`mobile/src/api/api.js` centralizes backend calls. This file is the boundary
between the mobile screens and the Django API. Keeping HTTP details here prevents
screens from duplicating request setup and error handling.

Good API helper functions have names that describe the product action, such as
`login`, `getFeedback`, or `updateFeedbackStatus`. Avoid naming helpers after
low-level transport details unless they are truly generic utilities.

When adding an endpoint helper, keep request headers, token handling, base URL
usage, and response normalization consistent with the existing helpers. This
keeps screens focused on user interaction rather than transport code.

## Navigation structure

`mobile/src/navigation/MainNavigator.js` defines the authenticated stack. It
maps route names to screen components and wraps those screens in the shared
layout component.

Navigation names are part of the app contract. If a route name changes, every
screen that navigates to that route must be updated at the same time. To reduce
mistakes, prefer stable route names and clear labels in the layout.

The navigator receives user and token values from the login flow. Screens that
need those values receive them as props. This keeps the data path visible to new
contributors.

## Shared layout

`mobile/src/components/Layout.js` provides common page structure. It is the
right place for repeated navigation chrome, title display, and user-aware layout
behavior.

Shared layout code should stay generic. If a piece of UI belongs only to one
role or one screen, place it inside that role screen unless it truly needs to be
part of every page.

## Screen wrapper

`mobile/src/components/ScreenWrapper.js` is a good place for repeated screen
spacing, safe-area behavior, and consistent background styling. The wrapper
should make screens feel consistent without hiding the screen's actual content
logic.

If layout bugs appear on multiple screens, check the wrapper first. If a bug
appears on only one screen, fix the screen directly instead of making the shared
wrapper more complicated.

## Login screen

`mobile/src/screens/LoginScreen.js` handles credential entry, loading state,
remembered username behavior, recent users, and navigation after authentication.

The login screen is security-sensitive because it handles credentials and
tokens. Avoid storing passwords. Remembered login behavior should store only the
minimum safe information, such as a username preference.

Errors should be clear enough for the user to recover but should not reveal
backend internals. A failed login can say that credentials are invalid; it should
not expose stack traces or server details.

## Home and help screens

`HomeScreen.js` and `HelpScreen.js` are user-facing informational screens. These
screens should use simple, direct language. They should help students and staff
understand what they can do next without duplicating the entire README.

When these screens grow, consider splitting repeated parts into small components
only if the same structure appears in more than one place.

## Placeholder screen

`PlaceholderScreen.js` exists so unfinished routes can still render a stable
message. It is useful during development, but important product workflows should
eventually replace placeholders with real screens.

Placeholders should be explicit about the future feature they represent. Avoid
generic messages that make it hard to know which route or feature is incomplete.

## Navbar

`Navbar.js` controls navigation links and role-aware movement through the app.
Because it affects how users reach every feature, small changes here can have a
large user experience impact.

When changing navigation items, confirm that route names exist in the navigator
and that the intended user role is allowed to open the destination screen.

## Student screens

Student screens support submitting feedback and checking feedback history. They
should make the submission process simple, especially for users who are reporting
urgent academic, facility, or service issues.

Feedback submission screens should validate required fields before making the
API request. Feedback list screens should show status clearly so students know
whether their issue is pending, in review, or resolved.

Anonymous feedback needs special care. If the student marks feedback as
anonymous, the mobile UI should avoid showing identity details in contexts where
that could confuse the privacy expectation.

## Department screens

Department screens help department users review feedback assigned to their unit.
They should prioritize clarity around category, status, submitted date, and the
student message.

When a department user updates feedback, the UI should make the result obvious.
If a status changes from pending to in review or resolved, the screen should
refresh or update local state so the user sees the new status immediately.

## Student affairs screens

Student affairs screens provide a broader review workflow. These screens may
need summary counts, recent feedback, and routing information. Keep these views
focused on decisions that student affairs users need to make.

Avoid placing admin-only behavior here unless the role permissions intentionally
allow it. If student affairs and admin users share a workflow, consider whether a
shared component would reduce duplicated UI.

## Admin screens

Admin screens support system-level review and user management. These screens are
powerful, so destructive actions should be clear and deliberate.

User management screens should show enough identity information to distinguish
accounts while avoiding unnecessary sensitive details. Feedback admin screens
should make filtering and status review efficient.

## Low-conflict mobile workflow

Pull before editing. Work in the smallest screen or component that owns the
change. Keep route additions paired with navigator updates. Keep API changes
paired with backend endpoint expectations. Push after a focused commit so other
collaborators can integrate quickly.

For comment improvements, explain the purpose of a screen, component, or helper.
Avoid comments that describe obvious JSX syntax. The most useful comments are
about data flow, role behavior, privacy behavior, and navigation decisions.

## Review checklist

Before pushing a mobile change, check that imported components exist, route names
match the navigator, API helpers return the shape expected by screens, loading
states are handled, and errors give the user a clear next step.

This guide should help collaborators read the mobile folder faster and make
small changes with less uncertainty.
