<script module>
  export const metadata = { title: 'Flowing Fund' }
</script>

<script lang="ts">
  import { type Snippet } from 'svelte'
  import ShieldIcon from '~icons/fa6-solid/shield'

  import { enes } from '../../../center/enes.svelte'
  import ezequiel from '../photos/ezequiel.jpg'
  import PM from '../components/PM.svelte'
  import StarrySky from '../components/StarrySky.svelte'
</script>

{#snippet linkBtn(text: string, url: string)}
  <a
    href={url}
    target={url.startsWith('http') ? '_blank' : undefined}
    class={[
      'btn px6 py3 mb6 mx-auto rounded-1',
      'bg-yellow-400 dark:(bg-yellow-500 text-gray-100)',
      'bg-gradient-to-br from-white/10 to-white/0',
      'hover:(from-white/30 to-white/20)',
      'shadow-[inset_0_1px_0_#fffa,inset_0_-1px_0_#0002,1px_1px_1.5px_0px_#0003]',
      'text-white tracking-wide text-shadow-[0px_1.2px_0_#0004,1.2px_1.2px_0_#0004]',
      ' font-sans font-bold',
      'bg-gray-300',
    ]}
  >
    {text}</a
  >
{/snippet}

<DocPage>
  <h1>{enes(`Ezequiel's Flowing Fund`, `Fondo Fluyente de Ezequiel`)}</h1>
  <div class="flexcc">
    <a
      class="text-lime-600 font-bold underline underline-(1.5 offset-2 opacity-50) -mt6 mb6 px2 rounded-md font-serif"
      href="/flowing-fund-gameworld"
      >[The Edgeworker's Flowing Fund Gameworld]</a
    >
  </div>
  <div class="flexcc mb6">
    <img
      class="rounded-full h24 w24 inline-block mr6"
      src={ezequiel}
      alt="Ezequiel's face"
    />
    <span class="text-8 font-serif flex-shrink text-center md:text-left"
      >Ezequiel Adrián <br class="md:hidden" />Schwartzman</span
    >
  </div>
  <div class="flex w-full mb6">
    <div class="w-1/2 text-center">
      <div class="text-8 font-serif">Cycle</div>
      <div>Every new moon</div>
    </div>
    <div class="w-1/2 text-center">
      <div class="text-8 font-serif">Flow</div>
      <div class="font-mono">US$ 1,600</div>
    </div>
  </div>
  <h2 class="text-center">What is the money for?</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb6">
    {#snippet moneyFor(title: string, amount: string, children?: Snippet)}
      <div
        class={[
          'darkish rounded-1 p6',
          { 'font-bold flexcc flex-col bg-gray-800! text-white!': !children },
        ]}
      >
        <div class="font-serif text-center text-6">{title}</div>
        <div class="font-mono text-6 text-center mb6">{amount}</div>
        <div class="text-justify">
          {#if children}{@render children()}{/if}
        </div>
      </div>
    {/snippet}

    {@render moneyFor('Land-base', 'US$ 600', moneyForLandBase)}
    {#snippet moneyForLandBase()}
      For the treasury of
      <a href="/current-land-base">the land-base I'm currently staying at</a>.
      This supports: stocking food, supplies, water, gas, electricity, Internet,
      taxes and/or rent (if it applies), and materials for maintenance, repairs
      and creative projects.
    {/snippet}

    {@render moneyFor('Coral', 'US$ 400', moneyForCoral)}
    {#snippet moneyForCoral()}
      Coral is my son. $200 stay with me, $200 go to his mother. When he's 16,
      the $400 it goes to him directly.
    {/snippet}

    {@render moneyFor('Personal', 'US$ 100', moneyForPersonal)}
    {#snippet moneyForPersonal()}
      Expenses that keep my Gremlin happy: namely to get ice cream once per week
      and go to the trampoline park or buy books and such. Also for bus rides,
      Uber rides, and gas sharing. For buying food from street vendors too. And
      for giving to people asking for money in the street. For carrying it
      around and throwing it in the air when appropiate.
    {/snippet}

    {@render moneyFor('Trainings', 'US$ 300', moneyForTrainings)}
    {#snippet moneyForTrainings()}
      Directly to the pockets of collegues or for traveling expeses and
      accomodation. I'm recording here on the website all <a href="/trainings"
        >the trainings I go into</a
      >.
    {/snippet}

    {@render moneyFor('Paying Back', 'US$ 200', moneyForPayingBack)}
    {#snippet moneyForPayingBack()}
      For paying back <a href="#money-coming-round">old debts</a> over time.
    {/snippet}

    {@render moneyFor('TOTAL', 'US$ 1600')}
  </div>

  <h2 class="text-center"> What am I working on?</h2>
  <div class="flexcc">
    {@render linkBtn('On My Workbench', '/on-my-workbench')}
  </div>

  <h2 class="text-center">The Fund</h2>
  <div
    class="w-full h60 bg-gray-900 rounded-4 mb6 p8 hover:p10 transition-all duration-1000 relative overflow-hidden"
  >
    <div
      class={[
        'bg-[hsl(50,100%,85%)] b-.5',
        'shadow-[inset_0_1px_1px_0_#fff7,0_0_15px_10px_hsla(50deg,100%,75%,0.5),inset_0_0_15px_20px_#fff7]',
        'b-white/40 relative z-20 rounded-8 h-full',
        'flexcc flex-col xs:flex-row text-8 sm:text-12 font-mono text-gray-700 font-bold text-shadow-[0_1.5px_0_#fff7,1.5px_1.5px_0_#fff7]',
      ]}
    >
      <span>0 / 9,600</span>
      <span class="text-4 ml6 opacity-50">US$</span>
    </div>
    <StarrySky />
  </div>
  <p class="text-center">6 cycles &times; US$ 1,600 = 9,600</p>
  <h2 class="text-center">Fund Guardian</h2>
  <p>
    You know how it's easier <em>not</em> to eat ice cream when you don't store ice
    cream at your land-base?
  </p>
  <p>
    That's what the Guardian is for; to not store the extra money where I can
    easily get at it. He or she keeps me accountable, and takes a stand with me
    for my commitment.
  </p>
  <div class="text-center text-4 flexcc mb6">
    <div class="flexcc p6 darkish rounded-4 relative font-serif">
      <ShieldIcon class="h20 w20 absolute top-2 left-2 text-gray-600" />
      <img
        src={ezequiel}
        class="mr6 h12 w12 rounded-full relative b-1.5 b-gray-700"
        alt="Ezequiel"
      />
      <span class="text-4">Ezequiel Adrián<br />Schwartzman</span>
    </div>
  </div>
  <p class="text-center">(yes I'm my own Guardian for now)</p>

  <h2 class="text-center">Funding</h2>
  <p class="text-justify">
    Here is a list of money protocols that I can receive funds at. After you
    send money here, fill the form below and this website will be updated.
  </p>
  <p class="text-justify">
    Fund contributors will be listed, linked, thanked, celebrated and honoured
    with the highest quality of my attention and presence. I will consider your
    feedback and requests most seriously.
  </p>
  <p class="text-justify">
    On contributing you can pick a condition for the contribution; for example,
    if you love my sleek website you can request to be added to the waitlist I'm
    holding to setup people with the tools for this kind of of Web Substrate.
    You can <PM>PM me</PM> for any kind of negotiating.
    <strong>Send me your outrageous proposals!</strong>
  </p>
  <div class="mb6 grid grid-cols-1 sm:grid-cols-2 gap-6">
    {#each [['AirTm', 'zequez'], ['Wise', 'zequez@gmail.com'], ['ETH', '0x8b61a066e7b29b4702b7bc78bd5cbb6a28442ba9'], ['Argentina Bank Alias', 'ezequiel.servicio']] as [name, address]}
      <div class="relative text-center darkish rounded-md">
        <div class="uppercase opacity-70 font-bold tracking-wide">{name}</div>
        <div class="break-all font-mono text-3 line-height-6">{address}</div>
        <input
          class="absolute inset-0 focus:outline-none opacity-0 hover:opacity-20 rounded-1 text-transparent bg-white cursor-pointer peer"
          value={address}
          onclick={(ev) => {
            ev.currentTarget.select()
            document.execCommand('copy')
            ev.currentTarget.blur()
          }}
        />
        <div
          class={[
            'flexcc opacity-0 peer-active:(opacity-90 transition-duration-0) transition-duration-1000 transition-opacity absolute',
            'bg-black/30 text-white dark:(bg-white/70 text-black) font-bold text-6 inset-0 uppercase',
            ' pointer-events-none rounded-1',
          ]}
        >
          Copied
        </div>
      </div>
    {/each}
  </div>
  <div class="flexcc">
    {@render linkBtn(
      'Show your commitment to my commitments',
      'https://forms.gle/fjxHnTT5KZvoffsu5',
    )}
  </div>
  <p>
    All recorded contributions proposals and committed to the fund <a
      href="https://docs.google.com/spreadsheets/d/15MQjtOWWAVehjbRlyFHfG89XPLiLp0UZq4B5h5Lj2ms/edit?usp=sharing"
      target="_blank">are listed here on this spreadsheet</a
    >.
  </p>
  <h2 class="text-center">Cycles Turnings</h2>
  <div class="grid cols-1 mb6">
    <div class="darkish p6 rounded-1 flex flex-col sm:flex-row">
      <div class="flexcc sm:flex-col">
        <div
          class="h24 w24 mb0 flex-shrink-0 rounded-full bg-gray-950 text-white flexcc font-serif text-12"
        >
          <span class="-mt2 ml.5">[1]</span>
        </div>
        <div class="ml6 sm:(mt6 ml0)">
          <div class="font-serif font-bold">21 Sep</div>
          <div class="font-serif text-6 lh-6 font-bold">2025</div>
        </div>
      </div>

      <div class="ml0 mt6 sm:(mt0 ml6) flex-grow">
        <div class="text-center font-serif text-4 xs:text-6 lh-12">
          Received <span class="font-mono ml3">US$ 1,600</span>
        </div>
        <div class="relative rounded-2 overflow-hidden py3 bg-black">
          <StarrySky />
          <div class="relative flexcc">
            <div
              class="w-1/4 text-white text-3 lh-4.5 flexcc font-serif text-center"
              >Imperial<br />Credits</div
            >
            <div
              class={[
                'w-1/2 h-12 mx3',
                'bg-[hsl(50,100%,85%)] b-.5',
                'shadow-[inset_0_1px_1px_0_#fff7,0_0_15px_10px_hsla(50deg,100%,75%,0.5),inset_0_0_15px_20px_#fff7]',
                'b-white/40 relative z-20 rounded-4',
                'flexcc font-mono text-gray-700 font-bold text-shadow-[0_1.5px_0_#fff7,1.5px_1.5px_0_#fff7]',
                'text-3 xs:text-4',
              ]}
            >
              <div class="flexcc w-1/2 text-center">US$ 0</div>
              <div class="flexcc w-1/2 b-l-1 b-black/10 text-center"
                >US$ 1,600</div
              >
            </div>
            <div
              class="w-1/4 text-white font-serif text-3 lh-4.5 flexcc text-center"
              >Fund<br />Credits</div
            >
          </div>
        </div>
        <div></div>
        <div class="text-center font-serif text-6 lh-12">Minted Credits</div>
        <div class="flexcc flex-wrap -m3">
          {#snippet credit(img: string)}
            <div
              class="h12 w20 bg-white/10 b-3 b-dashed b-white/70 m3 rounded-1"
            ></div>
          {/snippet}
          {@render credit('')}
          {@render credit('')}
          {@render credit('')}
          {@render credit('')}
        </div>
      </div>
    </div>
  </div>
  <h2 id="money-coming-round" class="text-center">Money coming round back to</h2
  >
  <p class="text-center">
    Here is the comprehensive list money I owe to others and haven't forgotten
    about, and I'm still committed to give.
  </p>
  <div class="darkish rounded-1 px6 overflow-hidden pt6 mb6">
    {#snippet owedTo(
      person: string,
      link: string,
      amount: string,
      circumstance: string,
    )}
      <div class="flex text-6 line-height-12">
        <div>
          {#if link}
            <a href={link} target="_blank">{person}</a>
          {:else}
            {person}
          {/if}
        </div>
        <div class="flex-grow flexcc px6">
          <div class="b-t-1 b-dashed w-full opacity-30"></div>
        </div>
        <div class="text-right font-mono">{amount}</div>
      </div>
      <div class="col-span-2 mb6 opacity-50 italic">
        <strong>Circumstance:</strong>
        {circumstance}
      </div>
    {/snippet}

    {@render owedTo(
      'Mirta Liliana Cappelluti',
      '',
      'US$ 1,250',
      `Mirta loaned me some money when I was buying
      a vehicle because I was afraid that if I made all the money from the Payoneer
      account enter the Argentinian bank system, the AFIP would be on my toes. So
      she transfer me part of the money from her own account. Thinking back it wasn't
      neccesary. Long story short, I had "reserved" the money for her on the Payoneer
      account, but then I ended up using it anyway, and I haven't been able to recoup
      it for years to give it back.`,
    )}
    {@render owedTo(
      'Maximiliano Gabriel Schwartzman',
      '',
      'EU$ 300',
      'I asked him for help and he helped me.',
    )}
    {@render owedTo(
      'Guillermo Daniel Schwartzman',
      '',
      'US$ 400',
      'I failed to pay rent, and he bailed me out. He was named on the contract as the fallback.',
    )}
    {@render owedTo(
      'Nacho DeGregori',
      '',
      'US$ 600',
      'I ran out of money and asked him for help, and he helped me. And then he committed suicide a few months afterward. I intend to give the money to his sister.',
    )}
    {@render owedTo(
      'Alex V. Pavlovcik',
      'https://pavlovcik.com/',
      'US$ 1,000',
      `I was sure the thing I was working on was going to work and I just needed a little more time and would be able to pay him back in a couple of months. It's been about 3 years.`,
    )}

    {@render owedTo(
      'Anne-Chloé Destremau',
      'https://www.annechloedestremau.org/',
      'EU$ 84.94',
      `I requested some books from the Thoughtware Press, for which I had the money to pay for
      when I did. Then there was a delay between the books being sent and the payment information
      to arrive to my email. Long story short, the books were sent before I paid, and when I was give
      the payment address I didn't have the money anymore.`,
    )}

    {@render owedTo(
      'Floirlan Luna',
      '',
      'AR$ 6,000',
      `He owns a tire repair shop on Mar del Plata and repaired a punctured tire of
      a car I was driving. He wouldn't take bank transfers, only cash, I gave him all
      the cash I had and we agreed I would come back to pay him back. I never went back.`,
    )}
  </div>
</DocPage>

<style>
  :global(.darkish) {
    @apply bg-black/10 shadow-[inset_0_0_0_1px_#0001] dark:(bg-white/10 shadow-[inset_0_0_0_1px_#fff3]);
  }
  /* :global(.animate-pulse-p) {
    animation: animate-pulse-p 4s infinite;
  }

  @keyframes animate-pulse-p {
    0% {
      @apply p8;
    }

    50% {
      @apply p10;
    }

    100% {
      @apply p8;
    }
  } */
</style>
