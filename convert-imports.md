# 🤖 AI Agent Guide: Fix Package-Level Imports

## 🎯 Purpose

Scan codebase to find and convert direct package-level imports to proper module-specific imports across all MuatMuat packages, following the established explicit import discipline.

## 🚨 CRITICAL: PACKAGE-LEVEL IMPORTS ARE FORBIDDEN

**❌ NEVER ALLOW PACKAGE-LEVEL IMPORTS:**
- `import { cn } from "@muatmuat/lib"` → FORBIDDEN
- `import { useDevice } from "@muatmuat/hooks"` → FORBIDDEN
- `import { Button } from "@muatmuat/ui"` → FORBIDDEN

**✅ ALWAYS USE SPECIFIC MODULE IMPORTS:**
- `import { cn } from "@muatmuat/lib/utils"` → CORRECT
- `import { useDevice } from "@muatmuat/hooks/use-device"` → CORRECT
- `import { Button } from "@muatmuat/ui/Button"` → CORRECT

## 🔄 Step-by-Step Process

### 1. Initial Setup

**First, check current package-level import status:**

```bash
# Search for any existing package-level imports
grep -r "from.*@muatmuat/[\"'][^/]" . --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx"

# Check package.json files for "." exports
find . -name "package.json" -exec grep -l '"\.":' {} \;
```

### 2. Identify Forbidden Import Patterns

**Search for these patterns across the codebase:**

```bash
# Pattern 1: @muatmuat/lib without subpath
grep -r "from.*@muatmuat/lib[\"'][^/]" . --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx"

# Pattern 2: @muatmuat/hooks without subpath
grep -r "from.*@muatmuat/hooks[\"'][^/]" . --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx"

# Pattern 3: @muatmuat/ui without subpath
grep -r "from.*@muatmuat/ui[\"'][^/]" . --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx"
```

**Example forbidden imports to fix:**
```javascript
// ❌ FORBIDDEN - Will cause build errors
import { cn } from "@muatmuat/lib";
import { useDevice, useDebounce } from "@muatmuat/hooks";
import { Button, Modal } from "@muatmuat/ui";
```

### 3. Find and Map Proper Import Mappings

**Check each package's exports to create correct mapping:**

**@muatmuat/lib Mappings:**
```json
{
  "exports": {
    "./axios-adapter": "./src/axios-adapter/index.ts",
    "./responsive-navigation": "./src/responsive-navigation.ts",
    "./stack-manager": "./src/stack-manager.ts",
    "./utils": "./src/utils/index.ts",
    "./utils/*": "./src/utils/*.ts"
  }
}
```

**@muatmuat/hooks Mappings:**
```json
{
  "exports": {
    "./auth-adapter": "./src/auth-adapter/index.ts",
    "./use-client-width": "./src/use-client-width/index.ts",
    "./use-client-height": "./src/use-client-height/index.ts",
    "./use-debounce": "./src/use-debounce/index.ts",
    "./use-previous": "./src/use-previous/index.ts",
    "./use-device": "./src/use-device/index.ts",
    "./use-drag": "./src/use-drag/index.ts",
    "./use-intersection-observer": "./src/use-intersection-observer/index.ts",
    "./use-shallow-effect": "./src/use-shallow-effect/index.ts",
    "./use-shallow-memo": "./src/use-shallow-memo/index.ts",
    "./use-countdown": "./src/use-countdown/index.ts",
    "./use-debounce-callback": "./src/use-debounce-callback/index.ts",
    "./swr-adapter": "./src/swr-adapter/index.ts"
  }
}
```

**@muatmuat/ui Mappings:**
```json
{
  "exports": {
    "./Alert": "./src/components/Alert/index.ts",
    "./Avatar": "./src/components/Avatar/index.ts",
    "./Badge": "./src/components/Badge/index.ts",
    "./Button": "./src/components/Button/index.ts",
    "./Calendar": "./src/components/Calendar/index.ts",
    "./Card": "./src/components/Card/index.ts",
    "./Chart": "./src/components/Chart/index.ts",
    "./Checkbox": "./src/components/Form/Checkbox.tsx",
    "./Collapsible": "./src/components/Collapsible/index.ts",
    "./Dropdown": "./src/components/Dropdown/index.ts",
    "./FilterDropdown": "./src/components/FilterDropdown/index.ts",
    "./Form": "./src/components/Form/index.ts",
    "./IconComponent": "./src/components/IconComponent/IconComponent.tsx",
    "./Input": "./src/components/Form/Input.tsx",
    "./Lightbox": "./src/components/Lightbox/index.ts",
    "./Loading": "./src/components/Loading/index.ts",
    "./Maps": "./src/components/Maps/index.ts",
    "./Modal": "./src/components/Modal/index.ts",
    "./NotificationDot": "./src/components/NotificationDot/index.ts",
    "./Popover": "./src/components/Popover/index.ts",
    "./Radio": "./src/components/Radio/index.ts",
    "./ScrollArea": "./src/components/ScrollArea/index.ts",
    "./Select": "./src/components/Form/Select.tsx",
    "./Table": "./src/components/Table/index.ts",
    "./TextArea": "./src/components/Form/TextArea.tsx",
    "./Timeline": "./src/components/Timeline/index.ts",
    "./Toaster": "./src/components/Toaster/index.ts",
    "./Tooltip": "./src/components/Tooltip/index.ts"
  }
}
```

### 4. Import Conversion Rules

**@muatmuat/lib Conversions:**

| Forbidden Import | Correct Import |
|----------------|---------------|
| `import { cn } from "@muatmuat/lib"` | `import { cn } from "@muatmuat/lib/utils"` |
| `import { createAxiosInstance } from "@muatmuat/lib"` | `import { createAxiosInstance } from "@muatmuat/lib/axios-adapter"` |
| `import { StackManager } from "@muatmuat/lib"` | `import { StackManager } from "@muatmuat/lib/stack-manager"` |
| `import { ResponsiveNavigation } from "@muatmuat/lib"` | `import { ResponsiveNavigation } from "@muatmuat/lib/responsive-navigation"` |

**@muatmuat/hooks Conversions:**

| Forbidden Import | Correct Import |
|----------------|---------------|
| `import { useDevice } from "@muatmuat/hooks"` | `import { useDevice } from "@muatmuat/hooks/use-device"` |
| `import { useDebounce } from "@muatmuat/hooks"` | `import { useDebounce } from "@muatmuat/hooks/use-debounce"` |
| `import { usePrevious } from "@muatmuat/hooks"` | `import { usePrevious } from "@muatmuat/hooks/use-previous"` |
| `import { useCountdown } from "@muatmuat/hooks"` | `import { useCountdown } from "@muatmuat/hooks/use-countdown"` |
| `import { useClientWidth } from "@muatmuat/hooks"` | `import { useClientWidth } from "@muatmuat/hooks/use-client-width"` |
| `import { useClientHeight } from "@muatmuat/hooks"` | `import { useClientHeight } from "@muatmuat/hooks/use-client-height"` |
| `import { useIntersectionObserver } from "@muatmuat/hooks"` | `import { useIntersectionObserver } from "@muatmuat/hooks/use-intersection-observer"` |
| `import { useDrag } from "@muatmuat/hooks"` | `import { useDrag } from "@muatmuat/hooks/use-drag"` |
| `import { useShallowEffect } from "@muatmuat/hooks"` | `import { useShallowEffect } from "@muatmuat/hooks/use-shallow-effect"` |
| `import { useShallowMemo } from "@muatmuat/hooks"` | `import { useShallowMemo } from "@muatmuat/hooks/use-shallow-memo"` |
| `import { useDebounceCallback } from "@muatmuat/hooks"` | `import { useDebounceCallback } from "@muatmuat/hooks/use-debounce-callback"` |
| `import { authAdapter } from "@muatmuat/hooks"` | `import { authAdapter } from "@muatmuat/hooks/auth-adapter"` |
| `import { swrAdapter } from "@muatmuat/hooks"` | `import { swrAdapter } from "@muatmuat/hooks/swr-adapter"` |

**@muatmuat/ui Conversions:**

| Forbidden Import | Correct Import |
|----------------|---------------|
| `import { Button } from "@muatmuat/ui"` | `import { Button } from "@muatmuat/ui/Button"` |
| `import { Modal } from "@muatmuat/ui"` | `import { Modal, ModalContent, ModalTitle } from "@muatmuat/ui/Modal"` |
| `import { Input } from "@muatmuat/ui"` | `import { Input } from "@muatmuat/ui/Form"` |
| `import { Select } from "@muatmuat/ui"` | `import { Select } from "@muatmuat/ui/Form"` |
| `import { TextArea } from "@muatmuat/ui"` | `import { TextArea } from "@muatmuat/ui/Form"` |
| `import { Checkbox } from "@muatmuat/ui"` | `import { Checkbox } from "@muatmuat/ui/Form"` |
| `import { BadgeStatus } from "@muatmuat/ui"` | `import { BadgeStatus } from "@muatmuat/ui/Badge"` |
| `import { Popover } from "@muatmuat/ui"` | `import { Popover, PopoverContent, PopoverTrigger } from "@muatmuat/ui/Popover"` |

### 5. Batch Conversion Strategy

**Phase 1: Detection**
```bash
# Create comprehensive search for all forbidden imports
find . -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | xargs grep -l "from.*@muatmuat/[\"'][^/]" > /tmp/forbidden-imports.txt
```

**Phase 2: Analysis**
```bash
# For each file, identify specific import patterns to fix
while read -r file; do
  echo "=== $file ==="
  grep -n "from.*@muatmuat/[\"'][^/]" "$file"
  echo ""
done < /tmp/forbidden-imports.txt
```

**Phase 3: Conversion**
```bash
# Apply systematic fixes to each file
while read -r file; do
  # Fix @muatmuat/lib imports
  sed -i 's/from "@muatmuat\/lib"/from "@muatmuat\/lib\/utils"/g' "$file"

  # Fix @muatmuat/hooks imports (analyze each hook)
  sed -i 's/useDevice/useDevice/g' "$file" # Add specific hooks

  # Fix @muatmuat/ui imports (map to correct components)
  sed -i 's/Button/Button/g' "$file"
  sed -i 's/Modal/Modal/g' "$file"
  # Add more patterns as needed
done < /tmp/forbidden-imports.txt
```

### 6. Validation Commands

**After conversion, verify fixes:**

```bash
# Ensure no package-level imports remain
if grep -r "from.*@muatmuat/[\"'][^/]" . --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx"; then
  echo "❌ ERROR: Package-level imports still exist!"
  exit 1
else
  echo "✅ SUCCESS: All imports converted to module-specific"
fi

# Verify all imports use proper subpaths
echo "🔍 Verifying import patterns..."
grep -r "from.*@muatmuat/" . --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" | grep -v "/utils\|/use-\|/auth-\|/swr-\|/Button\|/Modal\|/Form\|/Badge\|/Popover" && echo "❌ Invalid imports found" || echo "✅ All imports valid"
```

### 7. Special Cases Handling

**Multiple imports from same package:**

```typescript
// ❌ BEFORE: Multiple package-level imports
import {
  cn,
  formatDate
} from "@muatmuat/lib";

import {
  useDevice,
  useDebounce,
  usePrevious
} from "@muatmuat/hooks";

import {
  Button,
  Modal,
  Input
} from "@muatmuat/ui";
```

```typescript
// ✅ AFTER: Specific module imports
import { cn, formatDate } from "@muatmuat/lib/utils";
import { useDevice } from "@muatmuat/hooks/use-device";
import { useDebounce } from "@muatmuat/hooks/use-debounce";
import { usePrevious } from "@muatmuat/hooks/use-previous";
import { Button } from "@muatmuat/ui/Button";
import { Modal, ModalContent, ModalTitle } from "@muatmuat/ui/Modal";
import { Input } from "@muatmuat/ui/Form";
```

**Dynamic imports:**

```typescript
// ❌ BEFORE: Dynamic package-level import
const module = await import("@muatmuat/ui");
const Button = module.Button;

// ✅ AFTER: Dynamic module-specific import
const Button = (await import("@muatmuat/ui/Button")).Button;
```

### 8. Verification Checklist

- [ ] **No package-level imports**: Verify `import from "@muatmuat/package"` without subpath doesn't exist
- [ ] **All imports are module-specific**: Every import includes specific module path
- [ ] **TypeScript compilation passes**: No import-related errors from `tsc --noEmit`
- [ ] **Build process completes**: Vite/Next.js build succeeds without import errors
- [ ] **Editor autocompletion works**: IDE can resolve specific module imports
- [ ] **No runtime errors**: Application loads without module resolution errors
- [ ] **Tree-shaking effective**: Bundle analysis shows unused modules are eliminated

### 9. Testing Strategy

**Import Validation Tests:**

```javascript
// Test that all imports resolve correctly
const testImports = [
  () => import("@muatmuat/lib/utils"),
  () => import("@muatmuat/lib/axios-adapter"),
  () => import("@muatmuat/hooks/use-device"),
  () => import("@muatmuat/hooks/use-debounce"),
  () => import("@muatmuat/ui/Button"),
  () => import("@muatmuat/ui/Modal"),
  () => import("@muatmuat/ui/Form"),
];

// Ensure forbidden imports fail
const forbiddenImports = [
  () => import("@muatmuat/lib"),      // Should fail
  () => import("@muatmuat/hooks"),     // Should fail
  () => import("@muatmuat/ui"),        // Should fail
];
```

### 10. Documentation Updates

**Update any documentation that references old import patterns:**

```markdown
## Import Guidelines (Updated)

### Old Pattern (Deprecated)
❌ `import { cn } from "@muatmuat/lib"`

### New Pattern (Required)
✅ `import { cn } from "@muatmuat/lib/utils"`
```

## 🚨 Emergency Rollback

**If conversion causes critical issues:**

```bash
# Git reset to last known good state
git add .
git commit -m "Attempted package-level import fixes"
# If issues occur, revert:
git reset --hard HEAD^
```

## 🎯 Success Metrics

**Successful conversion when:**
- ✅ Zero package-level imports in entire codebase
- ✅ All 80+ existing imports use specific module paths
- ✅ Build and test suites pass without modification
- ✅ IDE intelligence and TypeScript work correctly
- ✅ Bundle size shows tree-shaking improvements

**Expected Impact:**
- **Better tree-shaking**: 10-30% bundle size reduction for unused modules
- **Faster builds**: More precise dependency tracking
- **Clearer dependencies**: Explicit module dependencies
- **Improved debugging**: Clear source mapping for imports

By following this guide, you'll ensure the entire MuatMuat codebase follows consistent explicit import patterns across all packages! 🚀