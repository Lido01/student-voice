# Collaboration Large Playbook

This playbook gives the team a longer collaboration reference for Student Voice.
It is added as documentation only so it does not interfere with app behavior.

## Daily Collaboration Flow

001. Start by confirming the repository folder is the real project folder.
002. Confirm the active branch before editing any file.
003. Pull the latest `dev` branch before starting work.
004. Read the files related to the task before changing them.
005. Decide whether the change belongs to backend, mobile, docs, or both.
006. Keep each commit focused on one clear purpose.
007. Avoid changing generated files unless the tool generated them intentionally.
008. Avoid changing lock files unless dependencies changed.
009. Avoid changing central files without a reason.
010. Create new docs files for large documentation additions.
011. Create new helper files when they reduce conflict risk and improve clarity.
012. Keep comments close to the code they explain.
013. Keep long explanations in docs instead of crowded source comments.
014. Push after a clean focused commit.
015. Tell teammates when a shared area changed.
016. Pull again before starting the next separate change.
017. Review staged files before each commit.
018. Use clear commit messages.
019. Keep commit history readable.
020. Confirm final status is clean.

## Low Conflict Habits

021. Prefer adding a new focused docs file over expanding a crowded README.
022. Prefer app-owned files over root project files.
023. Prefer small source edits over large rewrites.
024. Prefer clear comments over repeated obvious comments.
025. Prefer one route change at a time.
026. Prefer one serializer change at a time.
027. Prefer one screen change at a time.
028. Prefer one model change at a time.
029. Prefer one migration group at a time.
030. Prefer one workflow topic per docs file.
031. Avoid formatting entire files during small changes.
032. Avoid renaming files during unrelated changes.
033. Avoid moving code during simple comment work.
034. Avoid broad import reshuffling unless required.
035. Avoid editing the same file as another teammate when possible.
036. Ask before rewriting shared behavior.
037. Pull before editing files that often change.
038. Push quickly after resolving a shared-file update.
039. Keep generated changes separate from manual changes.
040. Keep documentation additions additive when possible.

## Commit Planning

041. Name the expected commit before editing.
042. Identify the files that should be included.
043. Identify files that should not be included.
044. Check whether tests or docs are needed.
045. Check whether backend and mobile contracts both change.
046. Check whether comments should be updated.
047. Check whether the README is the right place for the change.
048. Check whether a new docs file is safer.
049. Check whether the change is too large for one commit.
050. Split large work into reviewable chunks.
051. Keep each commit buildable when possible.
052. Keep each commit understandable from its message.
053. Use `docs:` for documentation-only additions.
054. Use `fix:` for bug fixes.
055. Use `feat:` for new user-facing behavior.
056. Use `refactor:` for internal restructuring.
057. Use `test:` for test-only additions.
058. Use `chore:` for maintenance work.
059. Avoid generic commit messages.
060. Avoid committing accidental local files.

## Backend Team Notes

061. Account changes affect authentication and roles.
062. Feedback changes affect the central product workflow.
063. Department changes affect routing and review ownership.
064. Notification changes affect user awareness and follow-up.
065. Settings changes can affect the whole backend.
066. Root URL changes can affect the whole API.
067. Model changes often need migrations.
068. Serializer changes often affect the mobile app.
069. View changes often affect permissions.
070. Service changes often affect repeated workflows.
071. Admin changes affect developer maintenance.
072. Test changes help protect collaboration work.
073. Docs changes help teammates move faster.
074. Privacy rules should be documented near the workflow.
075. Role rules should be easy to find.
076. Queryset filtering should happen before serialization.
077. Status values should remain consistent.
078. Category values should remain consistent.
079. Anonymous behavior should remain consistent.
080. API responses should remain stable.

## Mobile Team Notes

081. App entry changes affect startup.
082. Navigation changes affect many screens.
083. Layout changes affect many screens.
084. API helper changes affect data flow.
085. Login changes affect security and session flow.
086. Student screen changes affect feedback submission.
087. Department screen changes affect review workflows.
088. Admin screen changes affect high-permission workflows.
089. Help screen changes affect user guidance.
090. Placeholder screen changes affect unfinished routes.
091. Style changes affect readability.
092. AsyncStorage changes affect persisted data.
093. Token handling changes affect all protected calls.
094. Loading state changes affect perceived reliability.
095. Error state changes affect recovery.
096. Empty state changes affect clarity.
097. Route name changes must be synchronized.
098. API field name changes must be synchronized.
099. Form validation changes should match backend validation.
100. Mobile comments should explain data flow or role behavior.

## Documentation Team Notes

101. Documentation should match current code.
102. Documentation should use the same role names as code.
103. Documentation should use the same route names as code.
104. Documentation should use the same endpoint names as code.
105. Documentation should avoid outdated promises.
106. Documentation should avoid vague statements.
107. Documentation should explain why a workflow exists.
108. Documentation should explain where to make related changes.
109. Documentation should explain what to review before pushing.
110. Documentation should not expose secrets.
111. Documentation should not include private credentials.
112. Documentation should not include local machine-only instructions unless needed.
113. Documentation should keep examples simple.
114. Documentation should be easy to scan.
115. Documentation should use headings for long topics.
116. Documentation should use lists for checklists.
117. Documentation should stay close to the project vocabulary.
118. Documentation should be updated when behavior changes.
119. Documentation should be additive when conflict risk is high.
120. Documentation should be reviewed like code.

## Conflict Prevention

121. Pull before editing central files.
122. Avoid parallel edits to README when possible.
123. Avoid parallel edits to navigation when possible.
124. Avoid parallel edits to settings when possible.
125. Avoid parallel edits to package files when possible.
126. Avoid parallel edits to migrations when possible.
127. Communicate before touching shared flows.
128. Commit smaller pieces.
129. Push smaller pieces.
130. Review diffs before committing.
131. Keep docs additions in new files when possible.
132. Keep source comments concise.
133. Keep behavior changes separate from documentation changes.
134. Keep formatting changes separate from logic changes.
135. Keep dependency changes separate from feature changes.
136. Keep generated output separate from manual edits.
137. Keep merge resolutions careful and deliberate.
138. Check both sides of a conflict.
139. Preserve teammate changes when resolving.
140. Test or inspect after resolving.

## Push Routine

141. Run `git status --short --branch`.
142. Confirm only intended files changed.
143. Pull with fast-forward if local branch has no commits.
144. Stage the intended file or files.
145. Review the staged diff.
146. Commit with a clear message.
147. Push to `origin dev`.
148. If rejected, pull or rebase carefully.
149. Push again after resolving remote movement.
150. Confirm final branch status.
151. Do not force-push shared work casually.
152. Do not reset shared history casually.
153. Do not discard teammate changes.
154. Do not stage unrelated local files.
155. Do not commit editor settings accidentally.
156. Do not commit cache folders accidentally.
157. Do not commit build artifacts accidentally.
158. Do not commit personal notes accidentally.
159. Do not commit credentials accidentally.
160. Do not leave the repo dirty after the requested work.

## Review Priorities

161. Check security before style.
162. Check privacy before style.
163. Check role behavior before style.
164. Check data leakage before style.
165. Check broken imports before style.
166. Check route mismatch before style.
167. Check serializer mismatch before style.
168. Check migration correctness before style.
169. Check user-visible bugs before style.
170. Check docs accuracy before wording polish.
171. Check mobile loading states.
172. Check mobile error states.
173. Check backend permission classes.
174. Check backend queryset scopes.
175. Check anonymous feedback handling.
176. Check admin-only actions.
177. Check department-only actions.
178. Check student-only actions.
179. Check notification ownership.
180. Check final git status.

## Communication Notes

181. Say which area you are changing.
182. Say when a shared file changed.
183. Say when a migration was added.
184. Say when an API response changed.
185. Say when mobile screens need updates.
186. Say when docs are documentation-only.
187. Say when behavior is unchanged.
188. Say when a push has completed.
189. Say when a conflict happened.
190. Say how the conflict was resolved.
191. Keep updates short but specific.
192. Avoid hiding risky changes in vague messages.
193. Mention test gaps when tests were not run.
194. Mention manual verification when performed.
195. Mention branch names clearly.
196. Mention file names clearly.
197. Mention follow-up work only when useful.
198. Keep collaboration calm and traceable.
199. Keep history helpful for review.
200. Keep teammates able to continue from your work.

## Final Playbook Checks

201. Confirm documentation additions are useful.
202. Confirm every large docs file has a clear topic.
203. Confirm repeated lines are still meaningful.
204. Confirm checklist numbering is readable.
205. Confirm there are no accidental code behavior changes.
206. Confirm the new file path is under `docs`.
207. Confirm the commit is separate from other work.
208. Confirm the push is separate from other pushes.
209. Confirm final status is clean.
210. Confirm the playbook helps reduce future conflicts.
