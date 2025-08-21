<script lang="ts">
  import { Markdown } from 'svelte-rune-markdown'
  import bg from './bg.svg'
  import miniGarden from './photos/mini-garden.jpg'
  import faces from './photos/faces/stitched.jpg'
  import Frame from './Frame.svelte'
</script>

{#snippet title(text: string)}
  <div class="text-xl text-black/75 font-bold mb-1.5">{text}</div>
{/snippet}

<Frame id="archan-reference" x={-1219} y={-331} title="Archan Reference">
  {@render title('Archan Reference')}
  <Markdown
    content={`
Since I use some words that might be unfamiliar to people I've decided to create
reference notes right here on the website.
  `}
  />
</Frame>

<Frame id="gameworld" x={-1043} y={-97} title="Gameworld">
  {@render title('Gameworld')}
  <Markdown
    content={`
I won't go into details as to what a Gameworld is. There is plenty written about
it on the Startover website.

[Gameworld Theory](http://gameworldtheory.mystrikingly.com/)
[Gameworld Builder](http://gameworldbuilder.mystrikingly.com/)
[Gameworld Consulting](http://gameworldconsulting.mystrikingly.com/)
[Gaian Gameworlds](http://gaiangameworlds.mystrikingly.com/)
[Gameworld Incubator](http://gameworldincubator.mystrikingly.com/)
[Gameworld Traditions](http://gameworldtraditions.mystrikingly.com/)
[Gameworld Builder School](http://gameworldbuilderschool.mystrikingly.com/)
[Gameworld Demolition](http://gameworlddemolition.mystrikingly.com/)
[Gap in Gameworlds](http://gapingameworlds.mystrikingly.com/)
  `}
  />
</Frame>

<Frame id="startover-game" x={-1428} y={-102} title="Startover Game">
  {@render title('Startover Game')}
  <Markdown
    content={`
At [Startover.xyz](http://startover.xyz/), it's a network of interconnected websites originated by Clinton Callahan with
the purpose of upgrading human thoughtware around the world with radical
knowledge obtained on the Possibility Management Gameworld.

Each page holds new distinctions and experiments to land these distinctions
on your bodies.

As you do the experiments you are invited to log the Matrix points from doing them
along with some kind of proof. The part of logging the Matrix points does not work for
me (because I find it dull, clunky and pointless). But the part of being a homungous
(and I mean more than 500 pages homungus) repository
of radical paradigm shifting knowledge is extremely valuable and engaging. The first time
I discovered the Startover websites I became obsessed and stayed until morning reading
with a ridiculous number of opened tabs.

It's like finding a doorway to a wizards Wikipedia that it's actually humans from the
future that came back in time to teach you all about your untapped human powers.

As I see it, it's a huge doorway to archan culture.
  `}
  />
</Frame>

<Frame
  id="presencial-service"
  x={4}
  y={933}
  title="Presencial Service"
  draft={true}
>
  {@render title('Presencial Service')}

  <div>
    All meetings are subject to negotiation. Money or the lack of thereof is not
    an impediment.
  </div>

  <ul>
    <li>Emotional Healing Process</li>
    <li>Web Technology Consulting And Possibilities Service</li>
    <li>Group Spaceholding for Experimental Worktalks</li>
    <li>Interviews</li>
  </ul>
</Frame>

{#snippet ehp(num: number, person: string, time: string)}
  <div>{num} - {person} - {time}</div>
{/snippet}

<Frame id="ehp-credits" x={1085} y={537} title="EHP Credits">
  {@render title('EHP Credits')}

  {@render ehp(1, 'Sandra', '18 Apr 2025')}
  {@render ehp(2, 'Karol', '21 Apr 2025')}
  {@render ehp(3, 'Yair', '23 Apr 2025')}
  {@render ehp(4, 'Sandra', '2 May 2025')}
  {@render ehp(5, 'Karol', '5 May 2025')}
  {@render ehp(6, 'Karol', '19 May 2025')}
  {@render ehp(7, 'Sandra', '25 May 2025')}
  {@render ehp(8, 'Francisco', '25 May 2025')}
  {@render ehp(9, 'Karol', '4 Jun 2025')}
  {@render ehp(10, 'Francisco', '12 Jun 2025')}
  {@render ehp(11, 'Sandra', '27 Jun 2025')}
  {@render ehp(12, 'Nina', '21 Jun 2025')}
  {@render ehp(13, 'Francisco', '30 Jun 2025')}
  {@render ehp(14, 'Ian', '1 Jul 2025')}
  {@render ehp(15, 'Mar', '5 Jul 2025')}
  {@render ehp(16, 'Karol', '28 Jul 2025')}
  {@render ehp(17, 'Sandra', '31 Jul 2025')}
  {@render ehp(18, 'Karol', '16 Aug 2025')}
</Frame>

<Frame x={800} y={-50} bg={true}>
  <img
    class="w-500px max-w-none rounded-xl"
    src={miniGarden}
    alt="Miniature moss garden growing on a brick"
  />
</Frame>
