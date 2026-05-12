# Mobile Large Review Checklist

This file gives the team a detailed mobile review checklist.
It is documentation only and does not change the app runtime.

## General Mobile Review

001. Confirm the current branch is `dev` before starting mobile work.
002. Pull the latest remote changes before editing mobile files.
003. Check `git status` before staging mobile changes.
004. Keep mobile commits focused on one screen, component, or docs topic.
005. Avoid mixing unrelated backend and mobile edits.
006. Confirm imports point to existing files.
007. Confirm default exports and named exports are used correctly.
008. Confirm screen names match navigation route names.
009. Confirm component names are clear and consistent.
010. Confirm comments explain intent instead of repeating JSX.
011. Confirm no unused components are imported.
012. Confirm no unused state values remain.
013. Confirm no debug-only console messages are committed accidentally.
014. Confirm no credentials or tokens are hardcoded.
015. Confirm no local machine paths are committed.
016. Confirm package changes are intentional.
017. Confirm lock file changes are expected.
018. Confirm assets are referenced with correct paths.
019. Confirm screens render useful empty states.
020. Confirm screens render useful loading states.

## App Entry Checks

021. Confirm `App.js` keeps startup logic simple.
022. Confirm navigation is mounted once.
023. Confirm global providers are actually global concerns.
024. Confirm provider order is intentional.
025. Confirm app-level comments explain why wrappers exist.
026. Confirm root-level state does not duplicate screen state.
027. Confirm app startup does not perform unnecessary API calls.
028. Confirm root configuration is easy to scan.
029. Confirm app entry changes are tested by launching the app.
030. Confirm app entry changes do not break navigation.

## API Client Checks

031. Confirm API helper names describe product actions.
032. Confirm base URL usage is consistent.
033. Confirm token headers are added where needed.
034. Confirm public endpoints do not send unnecessary auth data.
035. Confirm response parsing matches backend output.
036. Confirm error handling is consistent across helpers.
037. Confirm API helpers return predictable values.
038. Confirm screens do not duplicate HTTP request setup.
039. Confirm file uploads use the expected request format.
040. Confirm login helper handles success and failure clearly.
041. Confirm feedback helper names match feedback workflows.
042. Confirm department helper names match department workflows.
043. Confirm notification helper names match notification workflows.
044. Confirm admin helper names are not used by normal users accidentally.
045. Confirm comments explain any non-obvious backend contract.
046. Confirm changed endpoints are reflected in backend docs.
047. Confirm API helper changes are paired with screen updates.
048. Confirm no sensitive token is printed.
049. Confirm network failure states can be shown by screens.
050. Confirm API client code remains readable.

## Navigation Checks

051. Confirm every route name used by buttons exists in the navigator.
052. Confirm every navigator screen imports the right component.
053. Confirm initial route behavior matches login flow.
054. Confirm user and token props pass to screens that need them.
055. Confirm unused route params are not required.
056. Confirm role-specific screens are not exposed accidentally.
057. Confirm placeholder routes are clearly temporary.
058. Confirm navigation titles match screen purpose.
059. Confirm comments explain route grouping when useful.
060. Confirm route changes are reflected in navbar links.
061. Confirm back navigation remains sensible.
062. Confirm nested navigation is avoided unless needed.
063. Confirm route names are stable enough for collaborators.
064. Confirm admin routes are easy to distinguish.
065. Confirm student routes are easy to distinguish.
066. Confirm department routes are easy to distinguish.
067. Confirm student affairs routes are easy to distinguish.
068. Confirm navigation changes do not break login redirect.
069. Confirm navigation changes do not break logout flow.
070. Confirm navigator code remains easy to scan.

## Layout Checks

071. Confirm shared layout does not contain screen-specific business logic.
072. Confirm layout receives the current user when needed.
073. Confirm layout title values are clear.
074. Confirm layout spacing stays consistent.
075. Confirm layout works for short and long screen content.
076. Confirm layout does not hide important screen controls.
077. Confirm layout comments describe shared responsibilities.
078. Confirm role-based layout behavior is intentional.
079. Confirm navigation controls are reachable.
080. Confirm layout updates do not break all screens.
081. Confirm repeated visual styles belong in shared layout.
082. Confirm one-off visual styles stay in the screen.
083. Confirm layout supports mobile screen sizes.
084. Confirm layout handles safe areas if required.
085. Confirm layout does not introduce horizontal overflow.
086. Confirm layout colors remain readable.
087. Confirm text contrast is acceptable.
088. Confirm buttons remain touch-friendly.
089. Confirm layout loading states are not duplicated unnecessarily.
090. Confirm layout changes are reviewed carefully.

## Login Screen Checks

091. Confirm username input is controlled correctly.
092. Confirm password input is controlled correctly.
093. Confirm password visibility toggle does not expose by default.
094. Confirm remember-me behavior avoids storing passwords.
095. Confirm recent users are stored safely.
096. Confirm login loading state prevents duplicate submissions.
097. Confirm login errors are clear to users.
098. Confirm login errors do not reveal backend internals.
099. Confirm successful login stores needed token data.
100. Confirm failed login clears unsafe temporary state.
101. Confirm login navigation uses the intended initial screen.
102. Confirm role-specific redirect behavior is correct.
103. Confirm AsyncStorage calls are awaited where needed.
104. Confirm AsyncStorage failures are handled gracefully.
105. Confirm login comments explain storage decisions.
106. Confirm login screen remains usable on small screens.
107. Confirm form fields have clear labels or placeholders.
108. Confirm submit button state matches loading state.
109. Confirm remembered username loads on app start.
110. Confirm recent user list does not grow forever.

## Student Screen Checks

111. Confirm students can create feedback with required fields.
112. Confirm students can choose feedback category.
113. Confirm students can choose target when required.
114. Confirm students can submit anonymous feedback.
115. Confirm anonymous option is visually clear.
116. Confirm image upload behavior is understandable.
117. Confirm submission loading state is visible.
118. Confirm submission success state is clear.
119. Confirm submission error state is recoverable.
120. Confirm feedback list shows current status.
121. Confirm feedback list shows useful dates.
122. Confirm feedback list handles no feedback.
123. Confirm feedback list handles network failure.
124. Confirm feedback detail does not expose private data.
125. Confirm student screens do not show admin actions.
126. Confirm student screens use API helpers instead of raw fetch logic.
127. Confirm comments explain privacy-sensitive behavior.
128. Confirm student dashboard links go to valid routes.
129. Confirm student dashboard summaries match backend data.
130. Confirm student UI remains simple enough for quick reporting.

## Department Screen Checks

131. Confirm department users see assigned feedback.
132. Confirm department users do not see unrelated feedback.
133. Confirm department feedback status is easy to read.
134. Confirm department update actions are protected by backend too.
135. Confirm department screens show loading states.
136. Confirm department screens show empty states.
137. Confirm department screens show useful error states.
138. Confirm department comments explain role expectations.
139. Confirm department dashboard counts match API data.
140. Confirm department filters are understandable.
141. Confirm department feedback cards show enough context.
142. Confirm department screens avoid sensitive student identity when anonymous.
143. Confirm department status updates refresh local UI.
144. Confirm department screens use stable route names.
145. Confirm department screens do not duplicate admin-only workflows.
146. Confirm department styles match the rest of the app.
147. Confirm department actions use clear button labels.
148. Confirm department network calls include token data.
149. Confirm department screens handle expired sessions gracefully.
150. Confirm department code stays focused on review workflow.

## Admin Screen Checks

151. Confirm admin dashboard links are valid.
152. Confirm admin feedback screen shows broad review data when intended.
153. Confirm admin user screen protects sensitive details.
154. Confirm admin actions are not shown to non-admin users.
155. Confirm admin API calls are protected by backend permissions.
156. Confirm admin tables or lists remain readable.
157. Confirm admin filters support common review tasks.
158. Confirm admin status changes are reflected immediately.
159. Confirm admin errors are clear but not overly technical.
160. Confirm admin comments explain high-impact actions.
161. Confirm destructive actions require clear user intent.
162. Confirm user management forms validate required fields.
163. Confirm role choices match backend role values.
164. Confirm admin screens handle empty lists.
165. Confirm admin screens handle slow network.
166. Confirm admin screens avoid accidental duplicate submissions.
167. Confirm admin views use shared layout correctly.
168. Confirm admin styling remains consistent.
169. Confirm admin imports do not include unused screens.
170. Confirm admin changes are reviewed with extra care.

## Help And Placeholder Checks

171. Confirm help content is accurate.
172. Confirm help content uses student-friendly language.
173. Confirm help screen does not duplicate too much README text.
174. Confirm placeholder screens identify the future feature.
175. Confirm placeholder descriptions are not misleading.
176. Confirm placeholder routes are replaced when features are complete.
177. Confirm help navigation works from the layout.
178. Confirm help screen renders on small devices.
179. Confirm help screen avoids hardcoded outdated details.
180. Confirm comments in help screens explain content structure only when needed.

## Styling Checks

181. Confirm colors are readable.
182. Confirm text does not overflow buttons.
183. Confirm important controls have enough touch area.
184. Confirm spacing is consistent between similar screens.
185. Confirm screen content scrolls when it needs to.
186. Confirm long lists do not break layout.
187. Confirm loading indicators are visible.
188. Confirm disabled buttons look disabled.
189. Confirm error messages are noticeable.
190. Confirm success messages are noticeable.
191. Confirm style names describe their purpose.
192. Confirm repeated styles are shared only when helpful.
193. Confirm comments do not describe obvious style properties.
194. Confirm responsive behavior is considered.
195. Confirm images render at useful sizes.
196. Confirm icon usage is consistent if icons are added.
197. Confirm form fields have enough vertical spacing.
198. Confirm headings match the importance of content.
199. Confirm no visual element overlaps another.
200. Confirm UI changes are checked manually.

## Final Mobile Checks

201. Confirm staged changes are intended.
202. Confirm mobile docs match current code.
203. Confirm route names are correct.
204. Confirm API helper names are correct.
205. Confirm screen comments are clear.
206. Confirm privacy expectations are explained.
207. Confirm role expectations are explained.
208. Confirm final status is clean after push.
209. Confirm collaborators can review the change quickly.
210. Confirm this checklist can grow with the app.
