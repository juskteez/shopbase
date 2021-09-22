from wand.image import Image

with Image(filename='img2eps/pikachu.png') as original:
    width, height = original.width, original.height
    with original.convert('eps') as converted:
        converted.save(filename='img2eps/pikachu.eps')