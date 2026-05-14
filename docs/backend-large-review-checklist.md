# Backend Large Review Checklist

This file gives collaborators a long, practical backend review checklist.
It is documentation only, so it adds useful content without changing runtime behavior.

## General Backend Review

001. Confirm the current branch is `dev` before starting backend work.
002. Pull the latest remote changes before editing backend files.
003. Check `git status` before making a commit.
004. Keep backend commits focused on one feature or one documentation topic.
005. Avoid mixing backend logic changes with mobile UI changes unless required.
006. Read the owning app before editing shared project configuration.
007. Keep project-level settings minimal and easy to audit.
008. Confirm new imports resolve from the expected module.
009. Remove unused imports before committing backend changes.
010. Keep model names clear and aligned with product language.
011. Keep serializer names clear and aligned with the model or use case.
012. Keep view names clear and aligned with endpoint behavior.
013. Keep URL route names stable when the mobile app depends on them.
014. Avoid broad rewrites when a small backend change is enough.
015. Prefer readable code over clever compressed expressions.
016. Confirm any new dependency is actually needed.
017. Do not add secrets to source code.
018. Do not commit local database files.
019. Do not commit generated cache folders.
020. Keep environment-specific settings outside committed code.

## Account Checks

021. Confirm the custom user model is referenced through `AUTH_USER_MODEL`.
022. Keep role values consistent across models, serializers, and views.
023. Validate required account fields during registration.
024. Avoid exposing password hashes in serializers.
025. Avoid exposing internal flags unless the endpoint needs them.
026. Confirm usernames are handled consistently.
027. Confirm institutional user IDs stay unique when required.
028. Keep admin-only account operations protected.
029. Keep student-only account operations scoped to the current user.
030. Keep department account behavior separate from student behavior.
031. Confirm login errors do not expose sensitive details.
032. Confirm authentication responses include only safe profile fields.
033. Confirm token handling matches the mobile client expectation.
034. Keep account serializer validation messages clear.
035. Use role helper methods when they make code easier to read.
036. Avoid duplicating role strings in many unrelated places.
037. Check account tests when role behavior changes.
038. Check migrations when user model fields change.
039. Keep user display strings simple and non-sensitive.
040. Confirm account admin configuration supports useful searches.

## Feedback Checks

041. Confirm feedback creation requires the correct fields.
042. Confirm optional image upload behavior remains supported.
043. Confirm category values match the backend choices.
044. Confirm status values match the backend choices.
045. Confirm target values are validated or clearly documented.
046. Confirm anonymous feedback does not expose student identity.
047. Confirm non-anonymous feedback shows identity only where appropriate.
048. Confirm student users can view their own feedback.
049. Confirm student users cannot view unrelated feedback.
050. Confirm department users see only relevant assigned feedback.
051. Confirm admin users can access wider review data when intended.
052. Confirm student affairs users have the expected review scope.
053. Confirm feedback ordering is useful for review screens.
054. Confirm indexes match common filtering needs.
055. Confirm status transitions are intentional.
056. Confirm resolved feedback remains visible in history.
057. Confirm pending feedback remains easy to find.
058. Confirm feedback serializers do not leak internal-only fields.
059. Confirm feedback list endpoints support mobile screens.
060. Confirm feedback detail endpoints protect private data.
061. Confirm feedback update endpoints restrict who can update status.
062. Confirm feedback delete behavior is either protected or unavailable.
063. Confirm feedback services do not duplicate view code unnecessarily.
064. Confirm feedback comments explain privacy-sensitive decisions.
065. Confirm feedback model string output is safe for admin display.
066. Confirm uploaded files use the expected media path.
067. Confirm feedback timestamps are created automatically.
068. Confirm querysets are filtered before serialization.
069. Confirm serializers handle missing optional fields gracefully.
070. Confirm feedback routes are grouped under the expected API prefix.

## Department Checks

071. Confirm department records use stable identifiers.
072. Confirm department display names are clear to mobile users.
073. Confirm department endpoints are protected when management is sensitive.
074. Confirm read-only department lists work for feedback forms if needed.
075. Confirm department serializers expose only useful fields.
076. Confirm department views do not contain feedback workflow logic.
077. Confirm feedback routing does not depend on fragile display text.
078. Confirm department updates do not break existing feedback records.
079. Confirm department admin search fields are useful.
080. Confirm department model ordering is predictable.
081. Confirm department migrations are included with schema changes.
082. Confirm department permissions match the intended staff workflow.
083. Confirm department deletion is safe or restricted.
084. Confirm inactive departments are handled if that concept is added.
085. Confirm department data is not duplicated in unrelated apps.
086. Confirm department endpoint names are easy to discover.
087. Confirm department tests cover important validation.
088. Confirm department docs match the current model.
089. Confirm mobile forms can read department data without extra mapping.
090. Confirm department comments explain routing expectations.

## Notification Checks

091. Confirm notification creation happens near the event that triggers it.
092. Confirm notification services keep repeated logic out of views.
093. Confirm notification recipients are scoped correctly.
094. Confirm students receive only their own alerts.
095. Confirm department users receive only relevant department alerts.
096. Confirm admin alerts do not overwhelm normal review workflows.
097. Confirm notification text is clear and short.
098. Confirm notification data does not expose private feedback details.
099. Confirm mark-as-read behavior checks ownership.
100. Confirm notification list ordering shows recent items first.
101. Confirm notification serializers expose useful timestamps.
102. Confirm notification views handle empty lists cleanly.
103. Confirm notification routes are grouped predictably.
104. Confirm notification tests cover read-state updates.
105. Confirm notification comments explain cross-app triggers.
106. Confirm notification model fields are enough for mobile display.
107. Confirm old notifications remain understandable after related changes.
108. Confirm notification deletes are protected if supported.
109. Confirm notification services avoid circular imports.
110. Confirm notification code does not block feedback creation unnecessarily.

## Serializer Checks

111. Confirm serializer fields match the API contract.
112. Confirm read-only fields cannot be modified by clients.
113. Confirm write-only fields are not returned in responses.
114. Confirm nested objects are used only when they help the client.
115. Confirm validation errors are useful for mobile screens.
116. Confirm serializers do not perform large unrelated queries.
117. Confirm serializers do not hide permission checks that belong in views.
118. Confirm serializer method fields are not too expensive.
119. Confirm file upload fields are configured correctly.
120. Confirm date fields use consistent formats.
121. Confirm status choices are validated at serializer level.
122. Confirm category choices are validated at serializer level.
123. Confirm anonymous behavior is handled consistently.
124. Confirm update serializers protect immutable fields.
125. Confirm create serializers set server-owned fields safely.
126. Confirm serializer comments describe non-obvious privacy logic.
127. Confirm serializer class names are specific enough.
128. Confirm serializer imports are local and necessary.
129. Confirm serializer tests cover invalid input.
130. Confirm serializer outputs match mobile usage.

## View Checks

131. Confirm every view has a clear permission rule.
132. Confirm every queryset is scoped to the current role.
133. Confirm list views do not return all records accidentally.
134. Confirm detail views reject inaccessible records.
135. Confirm create views attach server-owned fields safely.
136. Confirm update views limit editable fields.
137. Confirm delete views are protected or intentionally absent.
138. Confirm view comments explain role-based branches.
139. Confirm views use serializers consistently.
140. Confirm views return expected status codes.
141. Confirm validation errors return clean responses.
142. Confirm unexpected errors are not exposed to users.
143. Confirm view functions stay short enough to review.
144. Confirm repeated workflow logic moves into services.
145. Confirm views do not duplicate model constants unnecessarily.
146. Confirm pagination is considered for large lists.
147. Confirm filters are validated before use.
148. Confirm search behavior is safe and useful.
149. Confirm ordering behavior is stable.
150. Confirm views match documented API behavior.

## URL Checks

151. Confirm app URLs are included in the root URL configuration.
152. Confirm endpoint paths are descriptive.
153. Confirm route names are stable.
154. Confirm similar endpoints use consistent naming.
155. Confirm mobile code uses the current endpoint path.
156. Confirm admin URLs remain separate from API URLs.
157. Confirm media serving is development-only if configured.
158. Confirm URL comments explain broad route groups.
159. Confirm route changes are reflected in API docs.
160. Confirm deleted routes are not still referenced by mobile screens.

## Migration Checks

161. Confirm model changes include migrations.
162. Confirm migration files are reviewed before commit.
163. Confirm generated migrations do not include unrelated changes.
164. Confirm migration names describe the schema change.
165. Confirm merge migrations are created only when needed.
166. Confirm migration conflicts are resolved carefully.
167. Confirm existing data is considered before adding non-null fields.
168. Confirm defaults are intentional.
169. Confirm indexes are useful for common queries.
170. Confirm migration order is correct.
171. Confirm migrations do not import runtime-only helpers.
172. Confirm migrations are committed with their model changes.
173. Confirm migrations are not edited casually after sharing.
174. Confirm migration comments are rare and useful.
175. Confirm database-impacting changes are communicated to the team.

## Security Checks

176. Confirm authentication is required for protected endpoints.
177. Confirm role checks are enforced on the backend.
178. Confirm mobile-only hiding is not treated as security.
179. Confirm anonymous feedback privacy is preserved.
180. Confirm sensitive fields are not serialized.
181. Confirm uploaded files are handled safely.
182. Confirm debug mode is not assumed in production.
183. Confirm CORS settings are intentional.
184. Confirm secret values are not committed.
185. Confirm permission failures return safe messages.
186. Confirm object-level access is checked.
187. Confirm admin-only actions cannot be called by normal users.
188. Confirm user-supplied filters cannot bypass scoping.
189. Confirm logs do not include secrets.
190. Confirm comments document security-sensitive logic.

## Final Backend Checks

191. Confirm docs match the current backend behavior.
192. Confirm comments are clearer than the code they explain.
193. Confirm no generated cache files are staged.
194. Confirm no local environment files are staged.
195. Confirm `git diff --staged` shows only intended files.
196. Confirm the commit message explains the change.
197. Confirm the branch can fast-forward from origin.
198. Confirm the push succeeds.
199. Confirm final status is clean.
200. Confirm collaborators can understand the change from history.
201. Confirm backend comments use plain language.
202. Confirm endpoint behavior is described near the owning code.
203. Confirm future contributors know where to add related changes.
204. Confirm high-risk areas have enough explanation.
205. Confirm low-risk areas are not over-commented.
206. Confirm docs do not contradict source code.
207. Confirm examples use project vocabulary.
208. Confirm final review includes privacy and role behavior.
209. Confirm the backend remains behaviorally unchanged for docs-only edits.
210. Confirm this checklist can be expanded as the project grows.
