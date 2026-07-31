# @workday/canvas-system-icons-web

## 5.0.3

### Patch Changes

- ### Infrastructure
  - fix: Fix metadata bug ([#45](https://github.com/Workday/canvas-icons/pull/45))
    ([@RayRedGoose](https://github.com/RayRedGoose))

## 5.0.2

### Patch Changes

- ### System Icons
  - fix: Deprecate loop icon ([#44](https://github.com/Workday/canvas-icons/pull/44))
    ([@RayRedGoose](https://github.com/RayRedGoose))

## 5.0.1

### Patch Changes

- ### Icons
  - fix: Update deprecated icons to match v5 styles
    ([#43](https://github.com/Workday/canvas-icons/pull/43))
    ([@RayRedGoose](https://github.com/RayRedGoose)) All deprecated icons have been a visual-only
    update to match the new Sana Canvas look. The visual inconsistency has been fix for the icon.

  ### Infrastructure
  - chore: Update all external actions to use SHA1 for versioning
    ([#40](https://github.com/Workday/canvas-icons/pull/40))
    ([@alanbsmith](https://github.com/alanbsmith))

## 5.0.0

### Major Changes

The **`@workday/canvas-system-icons-web` v5** package ships **Sana Canvas Assets**. This is an
updated system icon library aligned with Sana Canvas.

The major changes in this release are:

- A **new visual look** that matches Sana icon style.
- **Workday and Sana icons merged** into a single library, which is why there are **almost 200 new
  icons**.

Deprecated icons remain available for a transition period. Each deprecated export points to a
**fallback** icon you should use instead. This guide summarizes what changed in v5 and how to
upgrade the package.

#### Renames

The Sana alignment introduced a number of new icons that did not previously exist in the Canvas
library. In earlier icon library work, we established a naming convention system and aligned all
Canvas icons with it for better organization and clearer icon meaning. With the addition of new Sana
icons, we need to extend that convention system so it also covers them.

In some cases, this also requires renaming existing Canvas icons. As we have added more variations
to existing icons, they now need systematic name or style changes to stay consistent. Their previous
names are now outdated or confusing.

| Old icon                        | Old JS name                       | New icon                  | New JS name                  |
| ------------------------------- | --------------------------------- | ------------------------- | ---------------------------- |
| Anomaly Detection               | `anomalyDetectionIcon`            | Line Chart Anomaly        | `lineChartAnomalyIcon`       |
| Arrow Diagonal Down Right Small | `arrowDiagonalDownRightSmallIcon` | Arrow Down Right          | `arrowDownRightIcon`         |
| Assistant                       | `assistantIcon`                   | Comment Blank             | `commentBlankIcon`           |
| Bar Chart Growth                | `barChartGrowthIcon`              | Bar Chart Ascending Arrow | `barChartAscendingArrowIcon` |
| Card User                       | `cardUserIcon`                    | Rectangle User            | `rectangleUserIcon`          |
| Collapse                        | `collapseIcon`                    | Arrow Left To Line        | `arrowLeftToLineIcon`        |
| Column One                      | `columnOneIcon`                   | Rectangle                 | `rectangleIcon`              |
| Download                        | `downloadIcon`                    | Arrow Down To Line        | `arrowDownToLineIcon`        |
| Dual Line Chart                 | `dualLineChartIcon`               | Line Chart Double         | `lineChartDoubleIcon`        |
| Easel                           | `easelIcon`                       | Presentation              | `presentationIcon`           |
| Extend                          | `extendIcon`                      | Arrow Right To Line       | `arrowRightToLineIcon`       |
| Flow                            | `flowIcon`                        | Split Up                  | `splitUpIcon`                |
| Lock Keyhole Open               | `lockKeyholeOpenIcon`             | Lock Open                 | `lockOpenIcon`               |
| Select                          | `selectIcon`                      | Square Pointer Dashed     | `squarePointerDashedIcon`    |
| Skip                            | `skipIcon`                        | Next                      | `nextIcon`                   |
| Sub Organization                | `subOrganizationIcon`             | Team Fill                 | `teamFillIcon`               |
| Upload                          | `uploadIcon`                      | Arrow Up To Line          | `arrowUpToLineIcon`          |
| Virtual Version                 | `virtualVersionIcon`              | Document Dashed           | `documentDashedIcon`         |
| Virtual Version Lock            | `virtualVersionLockIcon`          | Document Lock Dashed      | `documentLockDashedIcon`     |
| Zoom Area                       | `zoomAreaIcon`                    | Square Search Dashed      | `squareSearchDashedIcon`     |

#### Deprecations

The primary goal of the Sana Canvas Assets release is visual alignment with Sana. Some icons were
redesigned to match Sana's visual language. Their previous designs are now either mismatched or
redundant, so we no longer need to support them. Deprecated exports remain available for a
transition period.

| Old icon          | Old JS name            | New icon                | New JS name                  |
| ----------------- | ---------------------- | ----------------------- | ---------------------------- |
| Assistant Sparkle | `assistantSparkleIcon` | Comment Sparkle         | `commentSparkleIcon`         |
| Button Edit       | `buttonEditIcon`       | Edit                    | `editIcon`                   |
| Dropdown Button   | `dropdownButtonIcon`   | Dropdown                | `dropdownIcon`               |
| Lock Keyhole      | `lockKeyholeIcon`      | Lock                    | `lockIcon`                   |
| Loop              | `loopIcon`             | Arrows Counterclockwise | `arrowsCounterclockwiseIcon` |
| Redo              | `redoIcon`             | Arrow U Turn Right      | `arrowUTurnRightIcon`        |
| Undo              | `undoIcon`             | Arrow U Turn Left       | `arrowUTurnLeftIcon`         |

#### Layer Simplification

As part of the shift to Sana styles, several icons were simplified to match Sana's visual language.
Some elements were streamlined or removed for stylistic purposes. The result is cleaner icons with
fewer layers than their previous versions. Fewer than ten icons were affected. Layer structure
changed on the following icons:

- Dropdown
- Erase
- Inbox Fill
- Video

#### Additional links

- [Changes Overview](https://workday.github.io/canvas-kit/?path=/docs/guides-icon-migration-sana-canvas-assets-overview--docs)
- [Icon Codemod](https://workday.github.io/canvas-kit/?path=/docs/guides-icon-migration-codemod--docs)

## 5.0.0-alpha.1

### Major Changes

- ### System Icons
  - feat: Add v5 Sana Canvas icons ([#38](https://github.com/Workday/canvas-icons/pull/38))
    ([@RayRedGoose](https://github.com/RayRedGoose))

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
