# Collaboration Workflow

This workflow is written for contributors working together on the Student Voice
project. It focuses on reducing conflicts, keeping commits understandable, and
making small improvements easier to review.

## Shared branch habits

The active collaboration branch is `dev`. Before starting any change, pull the
latest version of the branch. This keeps local work close to the current remote
state and reduces the chance of push rejection.

Small commits are easier to review than mixed commits. A good commit changes one
kind of thing: one screen, one backend endpoint, one model adjustment, one docs
page, or one styling pass.

When several contributors are working at the same time, avoid editing the same
large file unless the change is necessary. New docs files, focused components,
and app-specific modules are less likely to collide.

## Conflict-safe change types

The lowest-conflict changes are usually new files, documentation files, tests,
small helper functions, and comments near code that a contributor already owns.
These changes add value while avoiding crowded files.

Higher-conflict files include README files, central settings, root navigation,
root URL routing, package lock files, and generated migrations. These files are
sometimes necessary to edit, but they deserve extra care.

When changing a central file, pull first, make the smallest possible edit, commit
quickly, and push before starting unrelated work. This gives the team a smaller
merge surface.

## Commit message style

Use a short prefix that explains the type of change. Examples include `docs:`,
`fix:`, `feat:`, `refactor:`, `test:`, and `chore:`. The rest of the message
should say what changed in plain language.

Good examples:

- `docs: add backend commentary map`
- `fix: preserve anonymous feedback identity`
- `feat: add department feedback filter`
- `test: cover login serializer validation`

Avoid vague messages such as `update`, `changes`, or `final`. They make the
history harder to understand when the team needs to review what happened.

## Backend workflow

For backend work, first identify the owning app. Account behavior belongs in the
accounts app. Feedback behavior belongs in the feedback app. Department behavior
belongs in the departments app. Notification behavior belongs in the
notifications app.

Read the model, serializer, view, and URL file for that app before editing.
Those four files usually explain the full path from database record to API
response.

If a model field changes, create and commit the migration with the model change.
If only serializer or view logic changes, a migration is not needed.

When changing permissions, write the rule in a way that future contributors can
read quickly. A role check hidden deep inside a long expression is harder to
audit than a small named helper or a clear branch.

## Mobile workflow

For mobile work, start from the screen that owns the user interaction. If the
screen only needs a backend call, update the API helper next. If the screen needs
a new route, update the navigator in the same focused change.

Keep shared components generic. A component used by many screens should not
accidentally contain behavior for only one role unless that behavior is passed in
clearly through props.

When changing a screen, check loading, success, empty, and error states. A screen
that works only when data arrives perfectly can still fail for real users on a
slow network.

## Documentation workflow

Documentation should explain the reason behind the code, not repeat every line.
Good docs help a teammate answer questions faster: where does this feature live,
who can use it, what data does it touch, and what should be checked before
pushing?

When adding docs, prefer a new focused file if the topic is large. This avoids
turning the README into a crowded file and reduces the chance of merge conflicts.

Docs should be kept close to the project vocabulary. Use the same role names,
screen names, endpoint names, and model names that the code uses.

## Comment workflow

Clear comments are useful when they describe intent, constraints, privacy rules,
role rules, or non-obvious data flow. Comments are less useful when they repeat
syntax that the language already explains.

Before adding a comment, ask what future collaborator will need to know. If the
answer is "this maps over an array", the comment may not help. If the answer is
"anonymous feedback must not expose the student identity here", the comment is
valuable.

Top-of-file comments are helpful when a file has a clear responsibility. Inline
comments are helpful when a specific rule protects correctness or privacy.

## Pull and push rhythm

Pull before each separate change when the branch is active. Commit only the files
that belong to the current change. Push after the commit so collaborators see it
quickly.

If a push is rejected because the remote moved ahead, pull with fast-forward when
there are no local conflicts. If local commits already exist, rebase carefully so
the history stays linear.

Do not force-push a shared branch unless the whole team agreed. Force-pushing can
remove or rewrite another contributor's work.

## Review rhythm

Review the changed files before committing. For docs, check spelling, accuracy,
and whether the text matches the current code. For backend code, check security,
permissions, migrations, and serializer output. For mobile code, check imports,
navigation, state updates, and error handling.

A reviewer should focus first on bugs and risks. Style notes are useful, but
privacy leaks, broken navigation, missing migrations, and incorrect permissions
matter more.

## File ownership tips

If two contributors need the same feature area, split ownership by file or by
layer. One person can handle the backend serializer and view while another
handles the mobile screen. Communicate the split before editing central files.

For a large feature, create a short task list before coding. The task list does
not need to be formal. It only needs to identify the files that are likely to
change and the order in which changes should land.

## Conflict resolution tips

When a conflict happens, read both sides before choosing. Keep the intent of both
contributors when possible. If both sides changed the same behavior differently,
decide which product behavior is correct before editing the conflict markers.

After resolving a conflict, run or inspect the affected path. A conflict can
resolve cleanly as text while still breaking imports, route names, or response
shapes.

## Useful final checks

Before pushing, run `git status --short --branch` to confirm the branch and the
files being committed. Use `git diff --staged` to review exactly what will be
recorded.

For backend edits, check whether migrations are needed. For mobile edits, check
whether package changes accidentally modified lock files. For docs edits, check
that links and file names are correct.

## Team note

Student Voice has both backend and mobile surfaces, so a small feature often
touches two parts of the project. The cleanest collaboration style is to keep
each commit focused, explain intent clearly, and push often enough that the team
does not drift far apart.

This workflow is meant to keep the project calm while several people improve it
at the same time.
