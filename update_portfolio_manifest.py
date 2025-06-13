#!/usr/bin/env python3
"""
Portfolio Image Manifest Generator
This script scans the Images&videos folder and generates a manifest file
that can be used by the website to dynamically load portfolio images.

Usage: python update_portfolio_manifest.py
"""

import os
import json
from pathlib import Path

# Portfolio folder configuration
PORTFOLIO_CONFIG = {
    'embedded': {
        'path': 'Images&videos/Embedded Software Development/',
        'title': 'Embedded Software Development',
        'description': 'Advanced firmware solutions for industrial applications and IoT devices, delivering robust and scalable embedded systems'
    },
    'pcb': {
        'path': 'Images&videos/PCB designing/',
        'title': 'Professional PCB Design',
        'description': 'High-complexity PCB solutions from concept to production, serving global industry leaders and cutting-edge applications'
    },
    'gui': {
        'path': 'Images&videos/Graphical User Interface Software/',
        'title': 'Industrial GUI & HMI Solutions',
        'description': 'Professional graphical user interface development for industrial applications'
    },
    'testbox': {
        'path': 'Images&videos/Test box for systems simulation/',
        'title': 'Hardware-in-the-Loop Testing',
        'description': 'Complete test automation systems for complex HVAC applications, enabling comprehensive validation and quality assurance'
    }
}

SUPPORTED_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.webp', '.mp4', '.mov', '.avi'}

def generate_alt_text(filename):
    """Generate alt text from filename"""
    name = filename.stem
    return name.replace('_', ' ').replace('-', ' ').title()

def generate_description(filename):
    """Generate description from filename"""
    name = filename.stem
    
    # Custom descriptions for specific files
    descriptions = {
        'STM32 microcontrollers for embedded systems, specifically in Munters dehumidifiers across a diverse range of sizes': 'STM32 microcontrollers for Munters dehumidifiers across diverse range of sizes',
        'STM32 and AVR microcontrollers for one of the world\'s most renowned coffee machines company': 'STM32 and AVR microcontrollers for world\'s most renowned coffee machines company',
        'nRF52 microcontrollers with LumenRadio Mira Modules for wireless temperature and humidity sensors and remote controls': 'nRF52 microcontrollers with LumenRadio Mira Modules for wireless sensors and remote controls',
        'dsPIC33 of Motor Control drivers': 'dsPIC33 Motor Control drivers for high-performance applications',
        'Extensive experience with various microcontroller families applied across a range of commercial products': 'Extensive experience with various microcontroller families across commercial products',
        'Control board for 4 groups coffee machine. This PCB includes 4 layers, SMD on both sides, PTH on one side. Total of 470 components': 'Control board for 4 groups coffee machine - 4 layers, SMD on both sides, PTH on one side, 470 components total',
        'Board design for a complex coffee machine PCB': 'Board design process for complex coffee machine PCB',
        'High power motor control board. This Board supports Field-Oriented-Control (FOC) algorithm with Power-Factor-Corrector (PFC)': 'High power motor control board supporting Field-Oriented-Control (FOC) and Power-Factor-Corrector (PFC)',
        'NFC board for high technology coffee machines with AI system for system recognition': 'NFC board for high technology coffee machines with AI system recognition',
        'Dashboard PCB design to control a stepper motor and RGB LEDs for coffee machines': 'Dashboard PCB design to control stepper motor and RGB LEDs for coffee machines',
        'PCB for low cost coffee machines attached directly to the machine heater to save space': 'PCB for low cost coffee machines attached directly to machine heater to save space',
        'Developed a GUI application by LabVIEW, for coffee machine services and production factories worldwide.': 'LabVIEW GUI application for coffee machine services and production factories worldwide',
        'PyQT5 application for test box machine simulator': 'PyQT5 application for test box machine simulator with intuitive interface',
        'Complete test box for complex humidification and dehumidification systems': 'Complete test box for complex humidification and dehumidification systems',
        '3D model for the case': '3D model design for the test box case with precision engineering'
    }
    
    return descriptions.get(name, name.replace('_', ' ').replace('-', ' '))

def scan_portfolio_folder(folder_path):
    """Scan a portfolio folder for images and videos"""
    images = []
    folder = Path(folder_path)
    
    if not folder.exists():
        print(f"Warning: Folder {folder_path} does not exist")
        return images
    
    for file_path in folder.iterdir():
        if file_path.is_file() and file_path.suffix.lower() in SUPPORTED_EXTENSIONS:
            # Use forward slashes for web compatibility
            src_path = str(file_path).replace('\\', '/')
            
            image_info = {
                'src': src_path,
                'alt': generate_alt_text(file_path),
                'description': generate_description(file_path)
            }
            images.append(image_info)
            print(f"Found: {src_path}")
    
    return images

def main():
    """Main function to generate the portfolio manifest"""
    print("Generating portfolio manifest...")
    manifest = {}
    
    for category, config in PORTFOLIO_CONFIG.items():
        print(f"\nScanning {config['title']} ({config['path']})...")
        images = scan_portfolio_folder(config['path'])
        
        manifest[category] = {
            'title': config['title'],
            'description': config['description'],
            'images': images
        }
        
        print(f"Found {len(images)} images for {category}")
    
    # Write manifest to file
    manifest_path = 'portfolio-manifest.json'
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    
    print(f"\nManifest written to {manifest_path}")
    print("You can now refresh your website to see the updated portfolio!")

if __name__ == '__main__':
    main()
