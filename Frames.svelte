<script lang="ts">
  import fearImg from './fear.jpg'
  import Frame from './Frame.svelte'
</script>

{#snippet title(text: string)}
  <div class="text-xl text-black/75 font-bold mb-1.5">{text}</div>
{/snippet}

<Frame id="origin" w={30} x={-7} y={-45}>
  <div class="flex mb4">
    <img
      src={fearImg}
      alt="Fear"
      class="w-30 h-30 flex-shrink-0 -mt-4 -ml-4 mr4 rounded-tl-md saturate-0 contrast-130 rounded-br-md shadow-[1.5px_1.5px_0px_2px_#888]"
    />
    <div class="flexsc flex-col text-left flex-grow">
      <div class="text-2xl text-black/75 font-bold mb-1.5">
        Ezequiel A. Schwartzman
      </div>
      <div class="-mt-1.5 mb-1.5 opacity-50 text-xs">
        Researcher & Artist & Inventor & Web-Technologist &
        EHP-Spaceholder-Apprentice & Mage-Apprentice & ...
      </div>
      <div class="text-xs">
        Taking a stand for Aliveness, Simplicity and Authenticity
      </div>
    </div>
  </div>

  <div class="text-sm flex flex-col space-y-1.5">
    <p>
      You don't get to tell me what I create or how. You are welcome to inspire
      me to take action with outrageous proposals. What I create and how I do it
      it's for my own delight.
    </p>
    <p></p>
    <p>
      I only sell one thing. It's credits for my <a href="#presencial-service">
        Presencial Service
      </a>
      . You can buy them and schedule meetings with me. What I create is a service
      for everybody, not for you in particular.
    </p>
    <p>
      You are welcome to buy a lifetime worth of meetings with me, and you can
      schedule them at your leisure by using the Calendar Link. No more than
      once or twice per week. You may also use the Calendar Link to join
      group-sized Presencial Service offerings that I publish. You can stay in
      touch with my offerings by subscribing on my Presence Link.
    </p>
    <p>
      You can see your credits with me on the Credits Link. You may buy credits
      with any currency and form of material and non-material value. There is a
      credits vending machine at the Protocols Link. For negotiation PM me.
      Mutual Credit is an option. And there is still plenty of spaces on my EHP
      training credits line. If we haven't met each other make sure to contact
      me before scheduling on the Calendar Link.
    </p>
    <p>
      You can find the most effective protocols for contacting me at my
      Protocols Link.
    </p>
  </div>
</Frame>
<Frame id="protocols-link" w={20} x={-23} y={480}>
  {@render title('Protocols Link')}
  <div>Instant messages:</div>
  EzequielSchwartzman @ Telegram Whatsapp
</Frame>

<Frame id="presence-link" w={30} x={-546} y={503}>
  {@render title('Presence Link')}
  <a class="block" href="https://github.com/zequez">Github activity</a>
  <a class="block" href="https://medium.com/@ezequiel.schwartzman">
    Articles on Medium
  </a>
</Frame>
<Frame id="presencial-service" w={30} x={-14} y={731}>
  {@render title('Presencial Service')}
</Frame>

<Frame id="calendar-link" w={24} x={531} y={464}>
  {@render title('Calendar Link')}
</Frame>
