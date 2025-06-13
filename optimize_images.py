"""
Image Optimization Script for Portfolio Website
Converts images to WebP format and creates responsive versions
"""

import os
from PIL import Image
import json

def optimize_images(source_dir, output_dir="optimized_images"):
    """
    Optimize images by converting to WebP and creating multiple sizes
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    # Define sizes for responsive images
    sizes = {
        'thumbnail': 300,
        'medium': 600,
        'large': 1200,
        'original': None
    }
    
    supported_formats = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff')
    optimized_manifest = {}
    
    for root, dirs, files in os.walk(source_dir):
        for file in files:
            if file.lower().endswith(supported_formats):
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, source_dir)
                
                try:
                    with Image.open(file_path) as img:
                        # Convert RGBA to RGB if necessary
                        if img.mode in ('RGBA', 'LA'):
                            background = Image.new('RGB', img.size, (255, 255, 255))
                            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                            img = background
                        
                        file_variants = {}
                        
                        for size_name, max_size in sizes.items():
                            if max_size:
                                # Resize image maintaining aspect ratio
                                img_copy = img.copy()
                                img_copy.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
                            else:
                                img_copy = img.copy()
                            
                            # Create output path
                            name_without_ext = os.path.splitext(rel_path)[0]
                            output_path = os.path.join(output_dir, f"{name_without_ext}_{size_name}.webp")
                            output_path = output_path.replace('\\', '/')
                            
                            # Ensure directory exists
                            os.makedirs(os.path.dirname(output_path), exist_ok=True)
                            
                            # Save as WebP with optimization
                            img_copy.save(output_path, 'WEBP', quality=85, optimize=True)
                            
                            file_variants[size_name] = {
                                'path': output_path,
                                'width': img_copy.width,
                                'height': img_copy.height
                            }
                        
                        optimized_manifest[rel_path] = file_variants
                        print(f"Optimized: {rel_path}")
                
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
    
    # Save manifest
    with open(os.path.join(output_dir, 'optimization_manifest.json'), 'w') as f:
        json.dump(optimized_manifest, f, indent=2)
    
    print(f"\nOptimization complete! Manifest saved to {output_dir}/optimization_manifest.json")
    return optimized_manifest

if __name__ == "__main__":
    source_directory = "Images&videos"
    if os.path.exists(source_directory):
        optimize_images(source_directory)
    else:
        print(f"Source directory '{source_directory}' not found!")
