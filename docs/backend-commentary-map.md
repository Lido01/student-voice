# Backend Commentary Map

This note explains the backend code in plain language so collaborators can
understand each Django app before making changes. It is intentionally separate
from runtime code, so improving it does not change application behavior.

## Project entry points

The backend starts through `manage.py` during local development. That file loads
the Django settings module and passes command-line actions such as migrations,
server startup, test execution, and superuser creation into Django.

The `config` package contains project-level wiring. It should stay focused on
settings, URL routing, and server adapters. App-specific behavior belongs inside
the app packages under `backend/apps`.

## Settings

`config/settings.py` defines the project configuration. The most important areas
for contributors are installed apps, middleware, database settings, REST
framework settings, authentication settings, static and media file settings, and
cross-origin configuration for the mobile client.

Changes in settings can affect the entire backend. When editing this file,
prefer small changes with a clear reason. A setting that is useful only for one
feature should be documented near the feature and then referenced here only when
the framework requires it.

## Root URL routing

`config/urls.py` connects app URL modules to the root API tree. It is the best
place to see which app owns each endpoint prefix. The root URL file should not
contain business logic. It should only include routes, static media helpers, and
admin configuration.

Each app keeps its own `urls.py`, which makes the API easier to extend without
causing accidental conflicts between teams working on different features.

## Accounts app

The accounts app owns users and authentication-facing behavior. The custom user
model extends Django's `AbstractUser`, which keeps normal Django authentication
features while adding Student Voice role information.

The `role` field is the main access-control signal used by the project. Common
role values include admin, department, student affairs, and student. When a view
needs to branch by role, the clearest approach is to keep that role check near
the view or in a small helper with a descriptive name.

The `user_id` field stores the institution identifier. It is separate from the
Django username so the application can support campus identifiers without losing
the built-in auth behavior that Django expects.

Account serializers should validate incoming user information and decide which
fields are exposed in responses. Avoid returning sensitive data such as password
hashes, tokens that do not belong in the response, or internal-only flags.

Account views should stay clear about whether they are public endpoints, normal
authenticated endpoints, or admin-only endpoints. Naming the permission rule near
the view helps future collaborators understand the security boundary quickly.

## Feedback app

The feedback app is the main workflow center of Student Voice. It stores what a
student submitted, whether the submission is anonymous, where the issue should
be routed, and what status the issue currently has.

Feedback categories describe the kind of issue, such as academic, facility, or
service. Status values describe the review progress, such as pending, in review,
or resolved. Those two concepts should stay separate because they answer
different questions.

The feedback model allows anonymous submissions. When `anonymous` is true, views
and serializers should be careful not to reveal the student identity to users
who should not see it. The database may still keep a relationship for internal
tracking, but the API response must respect the privacy decision.

Feedback views usually need role-aware filtering. A student should mostly see
their own submissions. Department users should see feedback routed to their area.
Admins may need wider visibility. These rules are easiest to maintain when each
queryset is named clearly and kept close to the endpoint that uses it.

Service helpers in the feedback app are a good place for repeated workflow
steps, such as choosing a target department, creating a notification, or applying
a status transition. Moving repeated workflow logic into services keeps views
readable.

## Departments app

The departments app represents the offices or groups that receive feedback.
Department data supports routing, filtering, and display in the mobile app.

Department serializers should keep the API shape stable. If the mobile client
depends on a department name or identifier, rename fields carefully and provide a
migration path when possible.

Department views should avoid mixing department management with feedback review
logic. A department endpoint should manage department records. A feedback
endpoint should manage feedback records that happen to be assigned to a
department.

## Notifications app

The notifications app captures updates that users need to see, such as status
changes or new feedback assigned to a role. Notification logic often touches
other apps, so the safest pattern is to call notification services from the place
where the event happens.

Notification models should store enough context to show a useful alert without
duplicating the entire feedback record. Keep the source object linked when
possible, and store simple display text only when it improves performance or
keeps old notifications understandable.

Notification views should filter alerts by the current user or role. A user
should not receive notifications meant for a different role unless the product
explicitly allows that.

## Admin files

Each app's `admin.py` file configures how models appear in Django admin. Admin
files should help developers inspect and repair data. They should not become the
main place for business rules.

Useful admin improvements include list displays, search fields, filters, and
read-only timestamps. Risky admin changes include actions that update many rows
without clear confirmation.

## Migrations

Migration files describe database history. They should normally be generated by
Django and reviewed before commit. Manual edits are possible but should be rare
and very deliberate.

When two collaborators create migrations at the same time, Django may need a
merge migration. Pull before creating migrations and keep model changes small to
reduce the chance of migration conflicts.

## Low-conflict backend workflow

Pull before starting a backend change. Work inside the smallest app that owns
the feature. Keep settings and root URLs minimal. Add or update serializers near
the views that use them. Run migrations only when the model schema changes.

For comment-only work, prefer clear purpose comments at the top of a file or
short comments near complex rules. Avoid comments that repeat the exact code.
The best comments explain why a rule exists, not just what Python is doing.

## Review checklist

Before pushing a backend change, confirm that imports still resolve, migrations
are included when models changed, serializers do not expose sensitive fields,
permissions match the intended role, and querysets do not leak data between
students, departments, and administrators.

This checklist is not a replacement for tests, but it gives collaborators a
shared mental model when reviewing small backend changes quickly.
