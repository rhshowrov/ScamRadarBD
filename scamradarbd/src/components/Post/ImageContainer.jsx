const ImageContainer = () => {
  return (
    <div class="grid grid-cols-2  rounded sm:grid-cols-3 md:grid-cols-4  gap-1 w-full">
      <div class="w-full aspect-square">
        <img src="/fr1.JPG" alt="Image 1" class="w-full h-full object-cover" />
      </div>

      <div class="w-full aspect-square">
        <img src="/fr2.jpg" alt="Image 2" class="w-full h-full object-cover" />
      </div>

      <div class="w-full aspect-square">
        <img src="/fr3.JPG" alt="Image 3" class="w-full h-full object-cover" />
      </div>

      <div class="w-full aspect-square">
        <img src="/fr4.jpg" alt="Image 4" class="w-full h-full object-cover" />
      </div>
    </div>
  );
};
export default ImageContainer;
