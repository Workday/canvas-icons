# @workday/canvas-system-icons-web

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
