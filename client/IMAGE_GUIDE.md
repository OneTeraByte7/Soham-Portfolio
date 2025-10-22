# Image Placement Guide for Your Portfolio

This guide tells you exactly where to place your images for the portfolio to display them correctly.

## Directory Structure

All images should be placed in the `public/images/` directory:

```
public/
  images/
    profile/
      profile.jpg          <- Your profile photo
    projects/
      project1.jpg         <- Autonomous multi-Agent RL Simulator project image
      project2.jpg         <- HealthCare Monitoring System project image
      project3.jpg         <- AI Scheduling Assistant project image
```

## Image Requirements

### 1. Profile Photo
- **Location**: `public/images/profile/profile.jpg`
- **Recommended Size**: 500x500 pixels (square)
- **Format**: JPG or PNG
- **Description**: Your professional headshot or portrait
- **Usage**: Displayed in the hero section (circular crop)

### 2. Project Images

#### Project 1: Autonomous multi-Agent RL Simulator
- **Location**: `public/images/projects/project1.jpg`
- **Recommended Size**: 800x600 pixels (4:3 ratio)
- **Format**: JPG or PNG
- **Description**: Screenshot or diagram of your RL simulator project

#### Project 2: HealthCare Monitoring System
- **Location**: `public/images/projects/project2.jpg`
- **Recommended Size**: 800x600 pixels (4:3 ratio)
- **Format**: JPG or PNG
- **Description**: Screenshot of the healthcare dashboard or system interface

#### Project 3: AI Scheduling Assistant
- **Location**: `public/images/projects/project3.jpg`
- **Recommended Size**: 800x600 pixels (4:3 ratio)
- **Format**: JPG or PNG
- **Description**: Screenshot or visualization of the AI scheduling system

## How to Add Images

1. Create the directories if they don't exist:
   ```bash
   mkdir -p public/images/profile
   mkdir -p public/images/projects
   ```

2. Copy your images to the appropriate locations:
   - Your profile photo to `public/images/profile/profile.jpg`
   - Project screenshots to `public/images/projects/`

3. Make sure the file names match exactly as specified above (case-sensitive)

## Image Optimization Tips

- Keep file sizes under 500KB for faster loading
- Use JPG format for photos (smaller file size)
- Use PNG format if you need transparency
- Ensure images are high quality but web-optimized

## Fallback Behavior

If images are not found, the portfolio will display:
- Colored gradient backgrounds as placeholders
- The layout will still look professional without images

## Notes

- All image paths are relative to the `public` folder
- The build process will automatically handle these images
- You can replace images at any time by overwriting the files
