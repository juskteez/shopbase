import os, sys
from PIL import Image

keep    = True
in_dir  = "orders"
out_dir = "converted-orders"
default_date = "25-08"

def cprt( string , code , flushed = False):
  print(f"\033[{code}m{string}\033[0m", flush = flushed)
def cstr( string , code ):
  return (f"\033[{code}m{string}\033[0m")

def run_orders(dir_name = ""):
  global keep
  dir_name = default_date if dir_name == "" else dir_name
  if dir_name not in ["", " "]:
    if dir_name.lower() == "kill":
      return False
    dir_name    = dir_name.replace("/","\\") if os.name == "nt" else dir_name
    path2orders = os.path.join(os.path.dirname(os.path.abspath(__file__)), in_dir, dir_name)
    path2convts = os.path.join(os.path.dirname(os.path.abspath(__file__)), out_dir)

    if not os.path.isdir(path2convts):
      os.mkdir(path2convts)

    if not os.path.isdir(path2cdir:=os.path.join(path2convts, dir_name)):
      os.mkdir(path2cdir)

    if os.path.isdir(path2orders):
      cprt(f"Working on {dir_name}", 95)
      allOrders = os.listdir(path2orders)
      for order in allOrders:
        orderPath = os.path.join(path2orders, order)
        if os.path.isdir(orderPath):
          allFiles = os.listdir(orderPath)
          if not allFiles:
            cprt(f"-- Skipped [{order}] => There's no valid images in the folder", 90)
            continue

          for file in allFiles:
            file_path = os.path.join(path2orders, order, file)
            # try:
            #   if file.endswith(".png"):
            #     image = Image.open(file_path)
            #     mask=Image.new('L', image.size, color=255)
            #     image.putalpha(mask)
            #     image.convert("RGB")
            #   elif file.endswith(".psd"):
            #     image = Image.open(file_path)
            #     # continue
            #   else:
            #     continue
            # except OSError:
            #   cprt(f"-- Cannot read [{order}/{file}]", 91)
            #   continue
            if file.endswith(".png"):
              image = Image.open(file_path)
              # image.convert("L")
              mask=Image.new('L', image.size, color=255)
              mask.convert("RGB")
              image.putalpha(mask)
              image.convert("RGB")
            elif file.endswith(".psd"):
              image = Image.open(file_path)
              # continue
            else:
              continue
            
            export_folder = os.path.join(path2convts, dir_name, order)
            if not os.path.isdir(export_folder):
              os.mkdir(export_folder)
            export_path = os.path.join(export_folder, file + ".eps")
            image.save(export_path, "EPS", lossless = True)
            cprt(f"-- Done [{order}/{file}] => [{export_path}]", 92)
            # try:
            #   image.save(export_path, "EPS", lossless = True)
            #   cprt(f"-- Done [{order}/{file}] => [{export_path}]", 92)
            # except:
            #   cprt(f"-- Failed to export [{order}/{file}] => [{export_path}]", 91)
            #   continue
        
    else:
      cprt(f"{dir_name} is not a valid directory", 91)

  return True

if __name__ == "__main__":
  try:
    while keep:
      welcome = "{} {}".format("Enter folder path", cstr("(relative to the script)", 90))
      print("-"*len(welcome))
      cprt("# Press Ctrl+C, or type: kill to quit", 90)
      print(welcome)
      orders_dir = input("@ : ")

      keep = run_orders(orders_dir)
  except KeyboardInterrupt:
    cprt("Exited by Keyboard", 94)