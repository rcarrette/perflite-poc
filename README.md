## Main requirements

- Node.js and npm: https://nodejs.org/en/download/prebuilt-installer

## Android requirements

### Downloads

- JRE (x64): https://www.java.com/fr/download/manual.jsp <br />
- JDK 17 (x64): https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html <br />
- Android Studio + Android SDK: https://developer.android.com/studio?hl=fr
- Install ionic globally: <code>npm install -g ionic@latest</code>

### On your phone

- Enable developer mode: <code>Phone settings -> About -> Tap several times on build number</code> <br />
- Enable USB debugging: <code>Phone settings -> Search for "developer options" -> Check USB debugging</code>

## Environment variables
- Add new user variable: <code>name: ANDROID_HOME value: C:\Users\xxx\AppData\Local\Android\Sdk</code> <br />
- Do the same with a new system variable <br /> <br />
- Add new system variable: <code>name: JAVA_HOME value: C:\Program Files\Java\jdk-17</code> <br /> <br />
- Add new system variable: <code>name: JRE_HOME value: C:\Program Files\Java\jre-1.8</code>

## Run the app
- Install dependencies: <code>npm install</code>
- Build: <code>npm run build</code>
- Run in your browser: <code>ionic serve</code>
- Run on your Android phone: <code>npx cap add android</code> (only once) and <code>npx cap run android</code>