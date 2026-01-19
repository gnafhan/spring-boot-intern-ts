# ☕ Install JDK untuk Syntax Highlighting

Error yang Anda alami:
```
Unable to locate a Java Runtime.
Cannot find java.
```

**Penyebabnya:** VS Code Java extensions membutuhkan JDK terinstall di local machine untuk syntax highlighting, IntelliSense, dan autocomplete.

**Catatan Penting:** JDK hanya untuk IDE support. Aplikasi tetap berjalan di Docker (tidak perlu JDK untuk run aplikasi).

---

## 🚀 Quick Install (Pilih Salah Satu)

### ⭐ Opsi 1: Homebrew (PALING MUDAH - Recommended)

```bash
# 1. Install Homebrew (jika belum ada)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install OpenJDK 21
brew install openjdk@21

# 3. Link ke system
sudo ln -sfn /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk \
  /Library/Java/JavaVirtualMachines/openjdk-21.jdk

# 4. Set JAVA_HOME di shell profile
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 21)' >> ~/.zshrc
echo 'export PATH="$JAVA_HOME/bin:$PATH"' >> ~/.zshrc

# 5. Reload shell
source ~/.zshrc

# 6. Verify
java -version
# Harus muncul: openjdk version "21.x.x"
```

### Opsi 2: Oracle JDK (Manual Download)

1. **Download:**
   - Buka: https://www.oracle.com/java/technologies/downloads/#java21
   - Pilih **macOS**
   - Download **ARM64 DMG** (M1/M2/M3) atau **x64 DMG** (Intel)

2. **Install:**
   - Double-click file `.dmg`
   - Follow installer
   - Verify:
     ```bash
     java -version
     ```

3. **Set JAVA_HOME:**
   ```bash
   echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 21)' >> ~/.zshrc
   source ~/.zshrc
   ```

### Opsi 3: SDKMAN (Untuk Advanced Users)

```bash
# 1. Install SDKMAN
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# 2. Install Java 21
sdk install java 21-open

# 3. Set default
sdk default java 21-open

# 4. Verify
java -version
```

---

## ✅ Verifikasi Instalasi Berhasil

Jalankan di terminal:

```bash
# Check Java version
java -version
# Expected: openjdk version "21.0.x" atau java version "21.0.x"

# Check Java Compiler
javac -version
# Expected: javac 21.0.x

# Check JAVA_HOME
echo $JAVA_HOME
# Expected: /Library/Java/JavaVirtualMachines/openjdk-21.jdk/Contents/Home
# (atau path serupa)
```

✅ **Jika semua command di atas berhasil**, JDK sudah terinstall dengan benar!

---

## 🔧 Setup VS Code Setelah Install JDK

### 1. Reload Window

Buka VS Code/Cursor, lalu:
```
Cmd+Shift+P → ketik "Developer: Reload Window" → Enter
```

### 2. Check Java Detection

```
Cmd+Shift+P → ketik "Java: Configure Java Runtime" → Enter
```

Anda harus melihat:
- ✅ Java 21 detected
- ✅ Path ke JDK installation

### 3. Install Java Extensions

Jika belum, install:
```
Cmd+Shift+P → "Extensions: Show Recommended Extensions"
```

Install minimal:
- ✅ **Extension Pack for Java** (Microsoft)
- ✅ **Spring Boot Extension Pack** (VMware)

### 4. Clean Java Workspace (Jika Masih Error)

```
Cmd+Shift+P → "Java: Clean Java Language Server Workspace"
→ Reload Window
```

---

## 🎨 Test Syntax Highlighting

Setelah reload, buka file Java (misal `HealthController.java`):

✅ **Harus muncul:**
- Keywords berwarna (`public`, `class`, `return`)
- Annotations berwarna (`@RestController`, `@GetMapping`)
- Strings berwarna
- Auto-completion saat ketik
- Red underlines untuk errors

✅ **Test IntelliSense:**
```java
// Ketik ini di file Java:
ResponseEntity.

// Harus muncul dropdown dengan suggestions:
// - ok(), notFound(), status(), dll
```

---

## 🐛 Troubleshooting

### Extension Masih Error Setelah Install JDK?

**1. Cek Java path:**
```bash
which java
# Harus return path, bukan "not found"

/usr/libexec/java_home -V
# Harus list semua JDK terinstall
```

**2. Set Java Home Manual di VS Code:**

Edit `.vscode/settings.json`:
```json
{
  "java.jdt.ls.java.home": "/Library/Java/JavaVirtualMachines/openjdk-21.jdk/Contents/Home"
}
```

Ganti path sesuai output dari: `/usr/libexec/java_home -v 21`

**3. Uninstall & Reinstall Java Extension:**
- Extensions → cari "Extension Pack for Java"
- Uninstall
- Reload window
- Install lagi

**4. Clear VS Code Cache:**
```bash
# Tutup VS Code dulu, lalu:
rm -rf ~/Library/Application\ Support/Code/User/workspaceStorage/*
rm -rf ~/Library/Caches/com.microsoft.VSCode
# Buka VS Code lagi
```

### Multiple Java Versions?

Jika punya multiple Java versions:

```bash
# List semua
/usr/libexec/java_home -V

# Set default ke Java 21
export JAVA_HOME=$(/usr/libexec/java_home -v 21)

# Atau use SDKMAN
sdk default java 21-open
```

### Homebrew Installation Failed?

Cek architecture:
```bash
# Check chip
uname -m
# arm64 = Apple Silicon (M1/M2/M3)
# x86_64 = Intel

# For Apple Silicon:
brew install openjdk@21

# For Intel:
arch -x86_64 brew install openjdk@21
```

---

## 📊 Architecture Comparison

| Component | Location | Purpose |
|-----------|----------|---------|
| **JDK (Local)** | macOS | IDE support (syntax highlighting, IntelliSense) |
| **Java (Docker)** | Container | Run aplikasi Spring Boot |
| **Database** | Docker | PostgreSQL untuk development |

**Kesimpulan:** Anda perlu keduanya:
- ✅ JDK lokal untuk coding experience
- ✅ Docker untuk running aplikasi

---

## 🎯 After Installation Checklist

- [ ] `java -version` berhasil
- [ ] `javac -version` berhasil
- [ ] `echo $JAVA_HOME` return path
- [ ] VS Code reload window
- [ ] Java extension tidak error lagi
- [ ] Syntax highlighting muncul di file `.java`
- [ ] IntelliSense/autocomplete bekerja
- [ ] Snippets bekerja (coba ketik `sout` lalu Tab)

---

## 💡 Next Steps

Setelah JDK terinstall dan syntax highlighting bekerja:

1. ✅ Coba snippets: `getm`, `controller`, `entity`
2. ✅ Start Docker: `docker-compose up --build`
3. ✅ Develop dengan hot reload
4. 🎉 Happy coding!

---

## 📚 Resources

- [Oracle JDK Downloads](https://www.oracle.com/java/technologies/downloads/)
- [Homebrew](https://brew.sh/)
- [SDKMAN](https://sdkman.io/)
- [Java in VS Code](https://code.visualstudio.com/docs/java/java-tutorial)

---

**Silakan pilih salah satu opsi install di atas, lalu reload VS Code!** 🚀
