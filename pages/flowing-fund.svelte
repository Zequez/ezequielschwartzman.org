<script module>
  export const metadata = { title: 'Flowing Fund' }
</script>

<script lang="ts">
  import Contribution from '../components/Contribution.svelte'
  import ezequiel from '../ezequiel.jpg'
</script>

<DocPage>
  <h1> Ezequiel's Flowing Fund </h1>
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

  <h2>Cycle</h2>
  <p>Every new moon</p>
  <h2>Amount Decision</h2>
  <p>The decision is to take $1,600 from the Fund every cycle</p>
  <ul>
    <li>
      $600 for whatever land-base treasury I'm currently staying at. This
      supports: stocking food, supplies, water, gas, electricity, Internet,
      taxes and/or rent (if it applies), and materials for maintenance, repairs
      and creative projects.
    </li>
    <li>
      $400 for my son Coral fund: $200 stay with me, $200 go to his mother. When
      he's 16, the $400 it goes to him directly.
    </li>
    <li>
      $100 for personal leisure expenses that keep my Gremlin happy: namely to
      get ice cream once per week and go to the trampoline park or buy books and
      such. Also for bus rides, Uber rides, and gas sharing. For buying food
      from street vendors too. And for giving to people asking for money in the
      street. For carrying it around and throwing it in the air when appropiate.
    </li>
    <li>
      $300 for trainings and coaching: directly to the pockets of collegues or
      for traveling expeses and accomodation.
    </li>
    <li>
      $200 for paying back old debts over time: I owe about $3000 to friends and
      family members that have given me money with the agreement that I would
      give it back, and I haven't yet.
    </li>
  </ul>

  <h2>Flowing Fund Guardian</h2>
  <div>Ezequiel Adrián Schwartzman</div>
  <p>
    Yes, there is nothing on the Gameworld rules about you not being able to be
    your own Guardian for you Flowing Fund</p
  >
  <p>
    And this will be until I find somenoe who is willing to be the Guardian of
    the money committed to my path, the Guardian of my Flowing Fund.
  </p>
  <h2>The Fund</h2>
  <p>Amount of money in the Flowing Fund:</p>
  <div class="text-center text-12 font-serif mb6"> AR$ 2000</div>
  <!-- <div class="w-full h12 bg-red-500 rounded-1"></div> -->
  <h3>How to add money to the fund</h3>
  <p>Here is a list of money protocols that I can receive funds at:</p>
  <div class="mb6 grid grid-cols-2 gap-6">
    {#each [['AirTm', 'zequez'], ['Wise', 'zequez@gmail.com'], ['ETH', '0x8b61a066e7b29b4702b7bc78bd5cbb6a28442ba9'], ['Argentina Bank Alias', 'ezequiel.servicio']] as [name, address]}
      <div
        class="relative text-center bg-black/10 shadow-[inset_0_0_0_1px_#0003] dark:(bg-white/10 shadow-none) rounded-md"
      >
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
    <a
      href="https://forms.gle/fjxHnTT5KZvoffsu5"
      target="_blank"
      class={[
        'btn px6 py3 mb6 mx-auto rounded-1',
        'bg-yellow-400 dark:(bg-yellow-500 text-gray-100)',
        'bg-gradient-to-br from-white/10 to-white/0',
        'hover:(from-white/30 to-white/20)',
        'shadow-[inset_0_1px_0_#fffa,inset_0_-1px_0_#0002,1px_1px_1.5px_0px_#0003]',
        'text-white tracking-wide text-shadow-[0px_1.2px_0_#0004,1.2px_1.2px_0_#0004]',
        ' font-sans font-bold',
        'bg-gray-300',
      ]}>Show your commitment to my commitments</a
    ></div
  >
  <p>
    All recorded contributions proposals and committed to the fund <a
      href="https://docs.google.com/spreadsheets/d/15MQjtOWWAVehjbRlyFHfG89XPLiLp0UZq4B5h5Lj2ms/edit?usp=sharing"
      target="_blank">are listed here on this spreadsheet</a
    >.
  </p>

  <h2>Ongoing Loans</h2>
  <p>$0</p>
  <p>Money from the fund is not being used by anyone at the moment</p>
  <h2>Cycles Turnings</h2>
  <h3>1st Cycle Turning at New Moon of 21 September 2025</h3>
  <p>Credits available for issuing $1,600</p>

  <!--

  <p>
    The money will be held by a trusted third party with better financial
    discipline and impeccable integrity with money. And I get $2,000 from the
    Ezequiel's Fund.
  </p>
  <p>
    So that the accumulated fund money doesn't stagnate, it will be available
    for no-interest loans.
  </p>
  <p>
    I might not actually spend all the money during each cycle and some might
    accumulate, this is feedback, not a design error. I will report how much is
    leftover of each bucket at the end of each cycle. Some trainings would
    require that I accumulate money during the year to pay for all the expenses.
  </p>

  <h2
    ><span class="line-through">Fundraising</span>
    <i class="underline underline-(black/25 offset-4 2) mr1">Flow</i>raising</h2
  >
  <p>
    I'm not interested in accumulating money.<br />
    I'm interested in money to flow into my land-base and those who hold space for
    the the Gameworlds I play on.<br />
    I'm not interested in selling anything.<br />
    I'm not interested in creating anything because I'm paid for.<br />
    I'm interested in practicing next culture and inventing next culture digital
    commons.<br />
    I'm interested in being supported by those who benefit from the Gameworlds I'm
    holding space for.<br />
  </p>
  <div class="h126 bg-gray-50 rounded-1rem b b-gray-200 mb6 flex flex-col">
    <div class="text-2rem font-serif text-center p6">Raised so far</div>
    <div class="flex flex-grow">
      <div class=" h-full w-1/2 pl6 flex flex-col">
        <div
          class="text-1.5rem line-height-200% font-serif font-bold text-center"
          >Material value</div
        >
        <div
          class="flex-grow bg-white shadow-[inset_0_0_1px_0_#000] rounded-.5rem p6 font-mono text-xs"
        >
          - EU$ 1000 from <a href="http://clintoncallahan.org"
            >Clinton Callahan</a
          >
          Conditions:
        </div>
      </div>
      <div class=" h-full w-1/2 pl6 pr6 flex flex-col">
        <div
          class="text-1.5rem line-height-200% font-serif font-bold text-center"
          >Non-Material value</div
        >
        <div
          class="flex-grow bg-white shadow-[inset_0_0_1px_0_#000] rounded-.5rem p6 font-mono text-xs"
        >
          - Coaching call from <a href="http://clintoncallahan.org"
            >Clinton Callahan</a
          >
          Conditions:
        </div>
      </div>
    </div>
    <div class="text-2.5rem line-height-4.5rem font-serif text-center"
      >Has the goal been reached?</div
    >
    <div
      class="text-3rem font-bold font-serif text-center mb6 underline underline-(8 offset-3 red-500)"
      >NO</div
    >
  </div> -->
  <!-- <p>I, Ezequiel, am personally raising funds for the following:</p>
  <ul>
    <li>
      <div class="h12 w12 flexcc text-2rem float-left">🛖</div>
      <strong>US$ 4000</strong> for filling the treasury of the city-locked land
      base,
      <a href="https://casaexp.ezequielschwartzman.org" target="_blank"
        >Casa Cooperativa Experimental</a
      >, I'm stewarding as a Bridgehouse in Mar del Plata, Argentina with money
      for electricity, Internet access, water, heating, food and materials for
      creatively collaborating with the house-land to create a nourishing
      environment for humans to invent
      <a href="https://archiarchy.mystrikingly.com/" target="_blank"
        >Archiarchy</a
      > together.
    </li>
    <li>
      <div class="h12 w12 flexcc text-1.5rem float-left">❤️‍🔥</div>
      <strong>US$ 2000</strong> for going to the ETB and Possibility Labs in Canela,
      RS, Brazil from 22 October to 3 November, and coming back hitch-hiking with
      another edgeworker to join the emerging Bridgehouse. The money accounts for
      training fees, accomodation fees, food cost, hitch-hiking, and some extra money
      to leave home for my son co-guardians.
    </li>
    <li>
      <div class="h12 w12 flexcc text-2rem float-left">✨</div>
      <strong>US$ 2000</strong> for materially activating the
      acoustic-insulation room on Casa Cooperativa Experimental for
      high-intensity violent and extremely loud emotional-body healing and
      training work in the neighbourhood. Such as holding space for
      <a href="https://www.rageclub.org/">Rage Club</a>. This actually would go
      through the treasury but would have this specific purpose.
    </li>
    <li>
      <div class="h12 w12 flexcc text-2rem float-left">🍰</div>
      <strong>US$ 2000</strong> for practical personal expenses that keep my
      <a href="https://gremlin.mystrikingly.com/">Gremlin</a> happy such as buying
      icecream, clothes, books, massages, hotsprings, surfing classes, a skateboard
      for my son, rollerskates for me, AI-access subscriptions, mobile phone data
      plan, Google One subscriptions, domain names renting, virtual servers, facturas,
      churros, cake, chocolate, Mr Fly trampoline park tickets, Club de Juego Libre
      membership for my son, bus rides, Uber rides, paying back debts, and more.
    </li>
  </ul>
  <p>
    I don't actually need any money for creating Web Environment, it's my
    personal programming sandbox and playground to express myself creatively,
    and for creating beautiful things, so I'll just keep working on it over time
    while I do other things.
  </p>
  <p>
    I do enjoy seeing the work I do meaningfully serving other people, and I do
    want people to ask me to build things that would be meaningful for them,
    coming from their authentic neccesity in serving their conscious Gameworlds
    and communities.
  </p>
  <p>
    Anything I build for anyone becomes available for everyone. So by asking me
    to build something you can also make it available to others.
  </p>
  <p>
    The purpose of the fundrasing is to flow it into the environment that
    supports me.
  </p>
  <p>
    And as I take a look at all my Gremlin favorite foods, I ask myself, how do
    I stay in integrity while receiving funds from a fundraising?
  </p>
  <p
    >Does the following form work for you? <a
      href="https://t.me/ezequielshwartzman">PM me your feedback.</a
    ></p
  >
  <Contribution />
  <p>
    I would rather not be burdened with much money, a steady sufficient flow
    works better for me.
  </p>
  <p>New idea: The Individual Material Support Fund Gameworld</p>
  <p>
    Backstory: The idea emerges from staying with the pain of indecision between
    fixed fundraising and monthly-contribution fundraising styles. A third
    option emerged.
  </p>
  <p>The fund is held by a high-integrity trusted third party</p>
  <p>
    The individual commits to take a fixed amount of money from the fund every
    specific cycle
  </p>
  <p>
    Wether the individual receives continual support from people (like Patreon)
    or a fixed amount of money (like Kickstarter), it makes no difference. The
    money goes into the fund. The individual is free to make a fixed fundraising
    to finance a year of work for example, and/or just gradually grow supporters
    over time that contribute monthly.
  </p>
  <p>
    The accumulated money from the fund is available for the Loaning Without
    Interest Gameworld
  </p>
  <p>The flows of money from the fund are public information</p>
  <p>
    The indididual declares the amount of money to be taken from the fund each
    cycle, and for what purpose is the money for.
  </p>
  <p>
    In order to change the amount of money to be taken from the fund each cycle,
    the individual and the trusted third party must agree.
  </p>

  <p>
    I was struggling between a fixed fundraising (like Kickstarter) and a
    flowrising (like Patreon)
  </p>-->
</DocPage>
