<div
  class="bg-gradient-to-t bg-gradient-to-red-600 bg-gradient-from-red-900 text-white text-xl rounded-b-md size-full flexcc"
>
  <div
    class="text-left block w-full h-full text-[40px] p4 line-height-10 whitespace-pre-line"
  >
    <div class="underline mb4">Road to holding space for 50 EHP</div>
    {#snippet ehp(num, name, date)}
      <div>
        <span class="opacity-50">#{num}</span>
        {name}
        <span class="opacity-50">- {date}</span>
      </div>
    {/snippet}
    {@render ehp(1, 'Sandra', '18 Apr 2025')}
    {@render ehp(2, 'Karol', '21 Apr 2025')}
    {@render ehp(3, 'Yair', '23 Apr 2025')}
    {@render ehp(4, 'Sandra', '2 May 2025')}
    {@render ehp(5, 'Karol', '5 May 2025')}
    {@render ehp(6, 'Karol', '19 May 2025')}
    {@render ehp(7, 'Sandra', '25 May 2025')}
  </div>
</div>
