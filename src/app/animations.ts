import { animate, animateChild, animation, group, query, stagger, state, style, transition, trigger, useAnimation } from "@angular/animations";


export let fadeInAnimation = animation([
    style({ opacity: 0 }),
    animate('{{ duration }} {{ easing }}')
], {
    params: {
        duration: '2000ms',
        easing: 'ease-out'
    }
});

export let fadeOutAnimation = animation(
    animate('200ms', style({ opacity: 0}))
);

export let fade = trigger('fade', [
    transition(':enter', useAnimation(fadeInAnimation, {
        params: {
            duration: '200ms',
        }
    })),
    transition(':leave', useAnimation(fadeOutAnimation)),
]);

export let slideFromLeft = trigger('slide', [
    state('void', style({ transform:'translateX(-100%)' })),
    transition(':enter', [
        style({ transform:'translateX(-20px)' }),
        animate('1000ms ease-out')
    ]),
    transition(':leave', [
        style({ backgroundColor: 'red' }),
        animate('200ms ease-in')
    ])
]);

export let todosAnimation = trigger('todosAnimation', [
    transition(':enter',[
      group([
        query('section', [
          style({ transform: 'translateY(-20px)' }),
          animate(500)
        ],
        { optional: true }),
        query('@slide',
          stagger('200ms', animateChild()),
          { optional: true }),
      ])
    ])
  ]);
