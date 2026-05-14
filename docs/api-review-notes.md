# API Review Notes

These notes describe how collaborators can review Student Voice API behavior
without needing to trace every file from scratch. The goal is to make endpoint
intent, data visibility, and role behavior easier to understand.

## API purpose

The backend API connects the mobile app to the data stored in Django. Each
endpoint should answer one clear product need: authenticate a user, create
feedback, list feedback, update feedback status, manage users, list departments,
or show notifications.

The safest API changes are small and explicit. A view should make it obvious who
can call it, which records are visible, which serializer is used, and what shape
the response returns.

## Authentication

Authentication endpoints verify a user's credentials and provide the token data
needed by the mobile app. These endpoints are public only in the sense that a
not-yet-authenticated user must be able to call them. They still need careful
validation and restrained error messages.

A login response should return only what the app needs for the session. Typical
data includes an access token, refresh token if used, and safe user profile
fields such as username, role, and institutional identifier.

Authentication views should never return password hashes, internal permission
objects, or debug information. They should also avoid messages that reveal
whether a username exists when that detail is not necessary.

## Role-based access

Student Voice depends on role-based behavior. The common roles are admin,
department, student affairs, and student. Each endpoint should be clear about
which roles can use it.

Admin users can usually see and manage more data than other users. Department
users should normally see feedback assigned to their department or target area.
Student affairs users may review broader feedback workflows. Student users
should mostly see their own submitted feedback.

When adding a view, decide the role rule first. Then build the queryset around
that rule. It is safer to start with a narrow queryset and widen it deliberately
than to start with all records and remember to filter later.

## Feedback creation

Feedback creation accepts student input such as subject, description, category,
target, optional image, and anonymous preference. The serializer should validate
required fields and reject unsupported values.

If a feedback submission is anonymous, the API should still store enough data to
support internal workflow, but responses must respect the privacy promise. A
student-facing or department-facing response should not accidentally expose the
student identity when anonymity is expected.

Feedback creation may also trigger notifications. The creation endpoint should
not contain a long notification implementation inline. A small service helper is
easier to test and easier to reuse when other workflows need the same event.

## Feedback listing

Feedback listing is where data leakage risk is highest. The same feedback model
can be viewed by different roles, but each role needs a different scope.

A student list should focus on the current student's own feedback. A department
list should focus on feedback assigned to the department. Admin and student
affairs lists may be broader, but they should still be explicit about the
business reason for that visibility.

Filters such as status, category, target, and created date can make lists more
usable. Filters should be validated so unsupported query values do not produce
confusing results.

## Feedback status updates

Status updates move feedback through the review process. The current statuses
include pending, in review, and resolved. A status change should be intentional,
visible, and ideally recorded in a way that supports future audit needs.

If a status update triggers a notification, keep the notification text clear and
short. The notification should tell the user what changed without requiring them
to understand backend internals.

Avoid letting every role update every status. Students might create and view
feedback, but department, student affairs, or admin roles are better suited to
review status changes.

## Department endpoints

Department endpoints expose the units that feedback can be routed to. These
endpoints support form choices, filtering, and management screens.

If departments are used as routing targets, changing a department identifier can
affect existing feedback. Prefer stable identifiers and clear display names. If
a department needs to be renamed, keep the data migration deliberate.

Department creation and editing should usually be restricted to admin-level
users. Reading department names may be safe for authenticated users if the mobile
app needs that list for feedback submission.

## Notification endpoints

Notification endpoints should show a user the alerts relevant to their role or
account. They may also support marking notifications as read.

Notification lists should be scoped carefully. A student should not see another
student's private feedback notification. A department user should not see alerts
for unrelated departments unless the product explicitly allows cross-department
visibility.

Mark-as-read behavior should update only notifications the current user is
allowed to access. A simple ownership or recipient check prevents one user from
mutating another user's notification state.

## Serializer responsibilities

Serializers translate between Python model objects and API JSON. They should
validate input, format output, and hide fields that do not belong in a response.

Serializers should not become large business-rule containers. If a rule is about
workflow, routing, notifications, or permissions, a view or service helper may be
clearer. If a rule is about whether a submitted field is valid, the serializer
is usually the right place.

## Error responses

Good error responses are specific enough to help the mobile app respond and the
user recover. They should not expose stack traces, SQL details, environment
variables, or framework internals.

Validation errors should point to the field that needs correction when possible.
Permission errors should make it clear that the user is not allowed to perform
the action. Missing records should return a normal not-found response.

## Compatibility with the mobile app

The mobile app expects stable response shapes. When changing an endpoint,
consider whether existing screens depend on field names, status values, token
names, or nested object shape.

If a response must change, update the mobile API helper and screen usage in the
same feature branch or commit series. Leaving frontend and backend contracts out
of sync creates runtime errors that are hard for users to recover from.

## Low-conflict API workflow

Before editing API code, pull the latest `dev` branch. Read the app-level URL
file, the target view, and the serializer used by that view. Make the smallest
change that fits the endpoint's responsibility.

If you add a new endpoint, update the app URL file and keep the route name clear.
If you change a response, update or add documentation in the API contract so the
mobile side can follow the new shape.

## Manual API review checklist

Check who can call the endpoint. Check which records the endpoint can read or
write. Check what serializer fields are exposed. Check whether anonymous
feedback hides identity correctly. Check whether status values are validated.
Check whether notifications are created only when appropriate.

Also check whether the mobile app already has a matching helper in `api.js`.
When the helper exists, keep its name and return shape consistent. When the
helper is missing, add it near related API functions so future contributors can
find it.

## Future testing notes

Useful backend tests would cover login success and failure, feedback creation,
anonymous feedback visibility, role-specific feedback lists, status updates,
department routing, and notification read state.

These tests can be added gradually. Start with the highest-risk privacy and role
rules because those are the places where a small mistake can expose the wrong
data to the wrong user.
