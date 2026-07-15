# @workday/canvas-system-icons-web

## 5.0.0-alpha.0

### Major Changes

- ### System Icons
  - feat: Add V5 sana canvas icons ([#34](https://github.com/Workday/canvas-icons/pull/34))
    ([@RayRedGoose](https://github.com/RayRedGoose)) Adds v5 Sana Canvas Icons

## 4.2.0

### Minor Changes

- ### Components
  - chore: Fix docs ([@RayRedGoose](https://github.com/RayRedGoose))
  - chore: Update deprecated GH Actions ([#23](https://github.com/Workday/canvas-icons/pull/23))
    ([@alanbsmith](https://github.com/alanbsmith))
  - chore Remove 'ready for review' label from auto review
    ([@RayRedGoose](https://github.com/RayRedGoose))

  ### Icons
  - feat(system): Add icon ([#29](https://github.com/Workday/canvas-icons/pull/29))
    ([@RayRedGoose](https://github.com/RayRedGoose)) The icon has been added to the system icons
    library.

  ### Infrastructure
  - chore: Update GHA to prevent failures ([#21](https://github.com/Workday/canvas-icons/pull/21))
    ([@RayRedGoose](https://github.com/RayRedGoose))
  - chore: Update package.json ([#28](https://github.com/Workday/canvas-icons/pull/28))
    ([@RayRedGoose](https://github.com/RayRedGoose))

## 4.1.0

### Minor Changes

### Icons

- feat: Add metadata files to packages ([#20](https://github.com/Workday/canvas-icons/pull/20))
  ([@RayRedGoose](https://github.com/RayRedGoose))
- ### Infrastructure
  - chore: Add main branch action ([@RayRedGoose](https://github.com/RayRedGoose))
  - chore: Add fixes for gh-pages ([@RayRedGoose](https://github.com/RayRedGoose))

## 4.0.5

### Patch Changes

- ### Icons
  - Fix class name for hourglass svg icon after renaming.

- ### Infrastructure
  - chore: Update action script ([@RayRedGoose](https://github.com/RayRedGoose))
  - chore: Update package.json to handle release ([@RayRedGoose](https://github.com/RayRedGoose))

## 4.0.4

### Patch Changes

- fix: Remove new lines from generated svg text in js.

## 4.0.3

### Patch Changes

- feat(system-web): Add workday and sana icons

## 4.0.2

### Patch Changes

- Change Objects to Object figma name for `object` icon after metadata fix.

## 4.0.1

### Patch Changes

- Fix icons category in some icons: `Object` -> `Objects`.

## 4.0.0

### Major Changes

This release marks a major milestone in the evolution of Workday's product, offering a new visual
style tailored for Workday's AI-driven future.

System Icons have undergone a major reorganization and renaming. This establishes predictable naming
conventions, eliminates duplicates, and ensures 1:1 alignment between Figma and Web icons. Changes
are detailed in our
[System Icons Upgrade Guide for Developers](https://canvas.workdaydesign.com/styles/assets/system-icons#tab=upgrade-guide-for-developers).

For a seamless transition from our legacy assets to our newest icons, we've provided the following
tools:

For a seamless transition from our legacy assets to our newest icons, we've provided the `v15-icons`
Codemod script for developers. This is available as part of the Canvas Kit codemod v15 package to
redirect projects to the new Expressive Icon packages and away from the legacy Accent Icon and
Applet Icon packages. It will also replace deprecated System Icons with the new System Icons.
