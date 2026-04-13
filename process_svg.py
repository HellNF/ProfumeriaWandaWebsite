import re

with open('public/media/WandaLogo3.svg', 'r') as f:
    svg_content = f.read()

# Find all path 'd' attributes
path_data_list = re.findall(r'd="([^"]+)"', svg_content, re.DOTALL)

print(f"Found {len(path_data_list)} paths")

all_x = []
all_y = []

for i, path_data in enumerate(path_data_list):
    # Clean and split the path data into numbers
    # We need to handle both commas and spaces
    clean_data = path_data.replace(',', ' ')
    path_coords = re.findall(r'[-+]?\d*\.\d+|\d+', clean_data)
    path_coords = [float(x) for x in path_coords]
    
    if len(path_coords) >= 2:
        xs = path_coords[0::2]
        ys = path_coords[1::2]
        # Sometimes there's an odd number of coordinates if something is wrong, 
        # but usually it's pairs. Let's be safe.
        min_len = min(len(xs), len(ys))
        xs = xs[:min_len]
        ys = ys[:min_len]
        
        all_x.extend(xs)
        all_y.extend(ys)
        print(f"Path {i}: {len(xs)} points, x range: {min(xs)} to {max(xs)}, y range: {min(ys)} to {max(ys)}")
    else:
        print(f"Path {i}: only {len(path_coords)} coordinates found, skipping")

if not all_x or not all_y:
    print("No coordinates found")
else:
    min_x = min(all_x)
    max_x = max(all_x)
    min_y = min(all_y)
    max_y = max(all_y)

    print(f'GLOBAL min_x: {min_x}, max_x: {max_x}, min_y: {min_y}, max_y: {max_y}')
    print(f'GLOBAL width: {max_x - min_x}, height: {max_y - min_y}')
