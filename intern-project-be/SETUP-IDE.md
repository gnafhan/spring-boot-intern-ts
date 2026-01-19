# 🎨 IDE Setup Guide - Syntax Highlighting & Snippets

Panduan lengkap untuk setup VS Code/Cursor dengan syntax highlighting dan snippets untuk Java Spring Boot.

## 🔌 Extensions yang Harus Diinstall

### 1. Install Extensions (Otomatis)

Saat Anda buka project ini, VS Code akan menampilkan notifikasi untuk install recommended extensions. Klik **"Install All"**.

Atau, tekan `Cmd+Shift+P` → ketik "Extensions: Show Recommended Extensions" → Install semua.

### 2. Install Extensions (Manual)

Jika tidak otomatis, install satu per satu:

#### Java Core (WAJIB)
1. **Extension Pack for Java** (vscjava.vscode-java-pack)
   - Includes: Language Support, Debugger, Test Runner, Maven, Project Manager
2. **Language Support for Java(TM)** (redhat.java)
3. **Debugger for Java** (vscjava.vscode-java-debug)
4. **Maven for Java** (vscjava.vscode-maven)

#### Spring Boot (WAJIB)
5. **Spring Boot Extension Pack** (vmware.vscode-spring-boot)
6. **Spring Initializr** (vscjava.vscode-spring-initializr)
7. **Spring Boot Dashboard** (vscjava.vscode-spring-boot-dashboard)

#### Database
8. **Database Client** (cweijan.vscode-database-client2)

#### Testing API
9. **REST Client** (humao.rest-client)

#### Docker
10. **Docker** (ms-azuretools.vscode-docker)

#### Code Quality (Optional)
11. **Checkstyle** (shengchen.vscode-checkstyle)
12. **SonarLint** (sonarsource.sonarlint-vscode)

---

## ⚙️ Verifikasi Installation

### 1. Cek Java Extension

Tekan `Cmd+Shift+P` → ketik "Java: Configure Java Runtime"

Anda harus melihat:
- ✅ Java runtime detected
- ✅ Language Support for Java activated

### 2. Cek Spring Boot Extension

Di sidebar kiri, Anda akan melihat icon:
- ☕ Java Projects
- 🍃 Spring Boot Dashboard

### 3. Test Syntax Highlighting

Buka file Java (misal `HealthController.java`), Anda harus melihat:
- ✅ Keywords berwarna (public, class, return, dll)
- ✅ Annotations berwarna (@RestController, @GetMapping)
- ✅ Strings berwarna
- ✅ Comments berwarna berbeda

---

## 🚀 Menggunakan Snippets

Saya sudah buatkan custom snippets untuk Spring Boot! File: `.vscode/java.code-snippets`

### Cara Menggunakan:

1. **Buat file Java baru**
2. **Ketik prefix** (lihat list di bawah)
3. **Tekan Tab atau Enter**
4. **Snippet akan expand**
5. **Navigasi dengan Tab** ke placeholder berikutnya

### 📝 Available Snippets

#### Architecture Components

| Prefix | Description | Output |
|--------|-------------|--------|
| `controller` | Full REST Controller | Controller dengan CRUD endpoints |
| `entity` | JPA Entity | Entity class dengan annotations |
| `repository` | JPA Repository | Repository interface |
| `service` | Service class | Service dengan CRUD methods |
| `springapp` | Main Application | SpringBootApplication class |

#### HTTP Mappings

| Prefix | Description | Output |
|--------|-------------|--------|
| `getm` | GET endpoint | @GetMapping method |
| `postm` | POST endpoint | @PostMapping method |
| `putm` | PUT endpoint | @PutMapping method |
| `delm` | DELETE endpoint | @DeleteMapping method |

#### ResponseEntity

| Prefix | Description | Output |
|--------|-------------|--------|
| `resok` | ResponseEntity OK | return ResponseEntity.ok() |
| `rescreated` | ResponseEntity Created | return ResponseEntity.status(CREATED) |
| `resnotfound` | ResponseEntity Not Found | return ResponseEntity.notFound() |
| `resnocontent` | ResponseEntity No Content | return ResponseEntity.noContent() |

#### Java Basics

| Prefix | Description | Output |
|--------|-------------|--------|
| `main` | Main method | public static void main |
| `sout` | Print to console | System.out.println() |
| `try` | Try-catch block | try-catch structure |
| `ctor` | Constructor | Constructor method |
| `getset` | Getter & Setter | Generate both methods |

---

## 🎯 Contoh Penggunaan Snippets

### 1. Buat Controller Baru

```java
// 1. Buat file: UserController.java
// 2. Ketik: controller
// 3. Tab untuk navigate:
//    - Ubah path jadi "/api/users"
//    - Ubah class name jadi "UserController"
//    - Tab lagi untuk field types
```

Hasil:
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    // ... full CRUD endpoints
}
```

### 2. Buat Entity Baru

```java
// 1. Buat file: User.java
// 2. Ketik: entity
// 3. Tab untuk navigate:
//    - Table name: "users"
//    - Class name: "User"
//    - Field type & name
```

Hasil:
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // ... complete entity setup
}
```

### 3. Buat Endpoint Cepat

Di dalam controller class:
```java
// Ketik: getm [Tab]
@GetMapping("/path")
public ResponseEntity<Object> methodName() {
    return ResponseEntity.ok(result);
}
```

---

## 💡 IntelliSense & Auto-Complete

Setelah extensions terinstall, Anda akan punya:

### 1. Import Auto-Completion

Ketik nama class (misal `ResponseEntity`) → Auto suggest muncul → Enter → Import otomatis ditambahkan!

### 2. Method Suggestions

Ketik object + `.` (titik) → Muncul list semua method yang available

```java
String name = "test";
name. // <- IntelliSense muncul dengan: length(), toUpperCase(), dll
```

### 3. Annotation Suggestions

Ketik `@` → Muncul list annotations:
- @RestController
- @GetMapping
- @Autowired
- dll

### 4. Parameter Hints

Saat ketik method dengan parameters, Anda lihat hint untuk parameter yang diperlukan.

### 5. Quick Fixes

Klik pada error (garis merah) → Light bulb muncul → Quick fix suggestions!

---

## 🎨 Customize Syntax Highlighting (Optional)

Jika mau ubah warna, edit `.vscode/settings.json`:

```json
{
  "editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        "scope": "storage.type.annotation.java",
        "settings": {
          "foreground": "#FF6B6B"  // Warna untuk @Annotations
        }
      },
      {
        "scope": "keyword.control.java",
        "settings": {
          "foreground": "#4ECDC4"  // Warna untuk keywords (if, return, dll)
        }
      }
    ]
  }
}
```

---

## 🐛 Troubleshooting

### Syntax Highlighting Tidak Muncul?

1. **Reload Window**: `Cmd+Shift+P` → "Developer: Reload Window"
2. **Cek Java Extension**: Pastikan "Language Support for Java" active
3. **Clean Java Workspace**: `Cmd+Shift+P` → "Java: Clean Java Language Server Workspace"

### Snippets Tidak Muncul?

1. Pastikan file extension `.java`
2. Cek settings: `"editor.quickSuggestions": true`
3. Ketik prefix → tunggu 1 detik → atau tekan `Ctrl+Space` untuk trigger

### Auto-Import Tidak Jalan?

Setting di `.vscode/settings.json`:
```json
{
  "java.saveActions.organizeImports": true
}
```

### IntelliSense Lambat?

1. Increase Java memory: `Cmd+Shift+P` → "Java: Configure Java Runtime"
2. Edit `.vscode/settings.json`:
```json
{
  "java.jdt.ls.vmargs": "-XX:+UseParallelGC -XX:GCTimeRatio=4 -XX:AdaptiveSizePolicyWeight=90 -Dsun.zip.disableMemoryMapping=true -Xmx2G -Xms100m"
}
```

---

## ⌨️ Keyboard Shortcuts (Penting!)

| Shortcut | Action |
|----------|--------|
| `Cmd+.` | Quick Fix / Show suggestions |
| `Cmd+Space` | Trigger IntelliSense |
| `Shift+Alt+F` | Format document |
| `Cmd+Shift+O` | Organize imports |
| `F12` | Go to definition |
| `Shift+F12` | Find all references |
| `Cmd+Click` | Go to definition |
| `Cmd+P` | Quick file open |
| `Cmd+Shift+P` | Command Palette |

---

## 🎯 Next Steps

1. ✅ Install semua recommended extensions
2. ✅ Reload window (Cmd+Shift+P → Reload Window)
3. ✅ Buka `HealthController.java` - cek syntax highlighting
4. ✅ Coba ketik `getm` di dalam class - cek snippet
5. ✅ Ketik `ResponseEntity.` - cek IntelliSense
6. 🚀 Mulai coding dengan productivity boost!

---

## 📚 Resources

- [Java in VS Code](https://code.visualstudio.com/docs/java/java-tutorial)
- [Spring Boot in VS Code](https://code.visualstudio.com/docs/java/java-spring-boot)
- [Snippets Guide](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

---

**Happy Coding dengan full IDE support! 🎉**
