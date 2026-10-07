// Contenido educativo: ERC 2025. Mantener lecciones y preguntas coherentes.
export const protocol = Object.freeze({
  emergency: '112',
  rate: '100–120',
  adultDepth: '5–6 cm',
  adultRatio: '30:2',
  childRatio: '15:2',
  childDepth: 'Al menos un tercio del grosor del tórax',
  initialBreaths: 5,
});

export const lessons = [
  {
    id: 'reconocer', title: 'Reconoce', subtitle: 'Acércate con seguridad',
    lead: 'Antes de ayudar, mira a tu alrededor. Tu seguridad también cuenta.',
    steps: [
      ['Comprueba el entorno.', 'Tráfico, electricidad, fuego… Si hay peligro, mantente a salvo y avisa al 112.'],
      ['Comprueba si responde.', 'Háblale y toca suavemente sus hombros. No uses estímulos dolorosos ni sacudidas fuertes.'],
      ['Si no responde, pide ayuda y llama ya.', 'No esperes a confirmar si respira. El 112 puede ayudarte a reconocer una parada.'],
    ],
    note: 'Que responda no significa que todo esté bien. Atiende a lo que le ocurre, vigila su estado y llama al 112 si necesita ayuda urgente.',
  },
  {
    id: 'llamar', title: 'Pide ayuda', subtitle: '112 y altavoz',
    lead: 'Si no responde, llama al 112 inmediatamente. No tienes que resolverlo todo a solas.',
    steps: [
      ['Pon el teléfono en altavoz.', 'Si hay otra persona, pídele que llame. Di dónde estás y que hay una persona que no responde. Sigue las instrucciones y no cuelgues.'],
      ['Abre la vía aérea y comprueba la respiración.', 'Mientras se conecta la llamada, inclina la cabeza hacia atrás y eleva el mentón. Mira el pecho, escucha y siente el aire durante no más de 10 segundos.'],
      ['Distingue respiración normal de jadeos.', 'Boqueadas aisladas, respiración lenta o con esfuerzo no son respiración normal. Si no responde y no respira normalmente, o tienes dudas, inicia RCP con la ayuda del 112.'],
      ['Si respira claramente con normalidad…', 'Mantén abierta la vía aérea y vigila continuamente. Si no hay sospecha de traumatismo, puedes colocarla en posición lateral de seguridad. Si deja de respirar normalmente, vuelve a colocarla boca arriba e inicia RCP.'],
    ],
    note: '¿Estás solo y sin teléfono ni conexión? Grita pidiendo ayuda. Si nadie puede llamar, busca la forma de avisar a emergencias cuanto antes y regresa.',
  },
  {
    id: 'adulto', title: 'RCP en adultos', subtitle: 'Comprime y deja subir',
    lead: 'Persona que no responde + respiración ausente o anormal: empieza las compresiones. El 112 te acompaña.',
    facts: [[protocol.rate, 'compresiones por minuto'], [protocol.adultDepth, 'de profundidad'], [protocol.adultRatio, 'si sabes y puedes ventilar']],
    steps: [
      ['Coloca las manos.', 'Talón de una mano en la mitad inferior del esternón, en el centro del pecho. La otra mano encima, dedos entrelazados. Brazos rectos y hombros sobre las manos.'],
      ['Comprime y libera la presión.', `Mantén ${protocol.rate} compresiones/minuto y una profundidad de ${protocol.adultDepth}. Deja que el pecho vuelva a subir completamente. Reduce las interrupciones.`],
      ['Si sabes y puedes, añade ventilaciones.', 'Alterna 30 compresiones con 2 ventilaciones. Abre la vía aérea, pinza la nariz y sella la boca. Cada soplo dura aproximadamente 1 segundo, solo hasta que el pecho empiece a elevarse. No interrumpas las compresiones más de 10 segundos para las dos ventilaciones.'],
      ['Si no sabes, no puedes o no quieres ventilar…', 'Haz compresiones continuas. No retrases la RCP esperando material de protección. Sigue las indicaciones del 112.'],
      ['Continúa y usa el DEA.', 'Reanima hasta que los profesionales te releven, aparezcan signos claros de vida con respiración normal, no puedas seguir por agotamiento o el entorno deje de ser seguro. Haz las pausas que indique el DEA.'],
    ],
    note: 'Si hay varios reanimadores, turnaos aproximadamente cada 2 minutos, con una interrupción mínima. No hace falta comprobar el pulso para empezar.',
    extra: 'Si la persona está en una cama, empieza allí: no retrases las compresiones intentando llevarla al suelo. El 112 te ayudará a adaptar la técnica.',
  },
  {
    id: 'pediatria', title: 'RCP en niños', subtitle: 'Las ventilaciones importan',
    lead: 'En niños, la falta de oxígeno suele ser una parte importante de la parada. Llama pronto y sigue al 112.',
    facts: [[String(protocol.initialBreaths), 'ventilaciones iniciales'], [protocol.rate, 'compresiones por minuto'], ['⅓', 'del grosor del tórax, al menos']],
    steps: [
      ['Si no responde, llama inmediatamente.', 'Con móvil, usa el altavoz. Si hay alguien contigo, pídele que llame y después traiga el DEA. Comprueba la respiración durante no más de 10 segundos mientras se conecta la llamada.'],
      ['Si no respira normalmente, da 5 ventilaciones iniciales.', 'Abre la vía aérea y sopla lo justo para que el pecho se eleve. En un lactante, mantén la cabeza en posición neutra y cubre boca y nariz con tu boca. Si no puedes ventilar, empieza las compresiones y añade ventilaciones en cuanto puedas.'],
      ['Adapta las compresiones al tamaño.', 'Comprime la mitad inferior del esternón. En niños mayores de un año, usa una o dos manos. En lactantes, utiliza los dos pulgares rodeando el tórax con las manos. En adolescentes, usa dos manos como en adultos.'],
      ['La profundidad depende del tórax.', `${protocol.childDepth}, sin superar 6 cm a ninguna edad. En adolescentes: ${protocol.adultDepth}. Mantén ${protocol.rate} compresiones/minuto y deja subir el pecho.`],
      ['Elige la relación según tu formación.', `Con formación específica en soporte vital básico pediátrico: ${protocol.childRatio}. Sin ella: ${protocol.adultRatio}, siguiendo al 112. La diferencia es la formación, no ser sanitario.`],
    ],
    note: 'La excepción del minuto: solo si estás solo y no tienes teléfono disponible, realiza 1 minuto de RCP antes de alejarte para pedir ayuda. Estar solo con móvil no es motivo para retrasar la llamada.',
    extra: 'En niños también se usa DEA. Si estás solo, prioriza llamar y empezar RCP antes de ir a buscarlo. Sigue las instrucciones del aparato.',
  },
  {
    id: 'dea', title: 'Usa el DEA', subtitle: 'Escucha sus instrucciones',
    lead: 'El desfibrilador analiza el ritmo del corazón y solo recomienda una descarga si corresponde. Cualquiera puede seguir sus indicaciones.',
    steps: [
      ['Enciéndelo cuando esté disponible.', 'Pide a otra persona que lo traiga mientras continúas RCP. Abre la tapa o pulsa encendido y escucha las instrucciones.'],
      ['Coloca los parches sobre el pecho desnudo.', 'Sigue el dibujo del aparato. Si sois dos, uno puede seguir comprimiendo mientras el otro coloca los parches.'],
      ['Que nadie toque a la persona durante el análisis.', 'Cuando el DEA lo indique, interrumpe las compresiones y comprueba que nadie la toca.'],
      ['Si recomienda una descarga, sigue al aparato.', 'Nadie debe tocar a la persona. Algunos equipos descargan solos; otros te piden pulsar un botón.'],
      ['Reanuda inmediatamente las compresiones.', 'Hazlo tanto después de una descarga como si no recomienda descargar. Sigue con RCP y escucha las siguientes instrucciones del DEA.'],
    ],
    note: 'Para niños de menos de 25 kg (aproximadamente 8 años), usa modo pediátrico si está disponible y coloca los parches delante y detrás según las instrucciones. Si no hay modo pediátrico, usa el modo adulto. Los parches nunca deben tocarse entre sí.',
  },
];

export const practicalChecklist = [
  'Comprueba la seguridad y la respuesta sin estímulos dolorosos.',
  'Llama al 112 en altavoz si no responde, antes de evaluar la respiración.',
  'Abre la vía aérea y comprueba respiración normal en no más de 10 segundos.',
  'Coloca las manos en la mitad inferior del esternón, brazos rectos.',
  `Comprime ${protocol.adultDepth} a ${protocol.rate} por minuto.`,
  'Permite que el pecho suba completamente y reduce las interrupciones.',
  'Practica 30:2 si sabes ventilar, o compresiones continuas si no puedes.',
  'Usa el DEA sin contacto durante análisis/descarga y reanuda RCP enseguida.',
];

export const questions = [
  {id:'call', level:1, prompt:'Una persona no responde. ¿Cuándo llamas al 112?', options:['En cuanto compruebo que no responde.', 'Después de comprobar su respiración.', 'Después de dos minutos de RCP.'], answer:0, explanation:'La llamada es inmediata si no responde. Con el altavoz activado, compruebas la respiración mientras se establece la conexión.'},
  {id:'gasp', level:1, prompt:'No responde y hace boqueadas aisladas. ¿Qué significa?', options:['Respira normalmente: espero.', 'Puede ser una parada: inicio RCP y sigo al 112.', 'Debo buscar el pulso antes de actuar.'], answer:1, explanation:'Los jadeos agónicos no son respiración normal. Si no responde y la respiración es anormal, asume una parada y empieza RCP.'},
  {id:'rate', level:1, prompt:'¿Cuál es el ritmo de las compresiones?', options:['60–80 por minuto.', 'Tan rápido como pueda.', `${protocol.rate} por minuto.`], answer:2, explanation:`Mantén ${protocol.rate} compresiones/minuto y deja que el pecho vuelva a subir completamente.`},
  {id:'depth', level:1, prompt:'En un adulto, ¿cuánto debe bajar el pecho?', options:['2–3 cm.', `${protocol.adultDepth}.`, 'Más de 8 cm.'], answer:1, explanation:`En adultos, al menos 5 cm y no más de 6 cm: ${protocol.adultDepth}.`},
  {id:'breaths', level:1, prompt:'No sabes dar ventilaciones. ¿Qué haces en un adulto?', options:['Espero a que llegue alguien que sepa.', 'Solo doy ventilaciones.', 'Hago compresiones continuas y sigo al 112.'], answer:2, explanation:'Si no sabes, no puedes o no quieres ventilar, haz compresiones continuas. No retrases la RCP.'},
  {id:'aed', level:1, prompt:'El DEA dice que no recomienda descarga. ¿Qué haces?', options:['Reanudo inmediatamente la RCP.', 'Apago el aparato.', 'Espero al siguiente análisis sin comprimir.'], answer:0, explanation:'Tanto después de una descarga como si no la recomienda, reanuda inmediatamente las compresiones y sigue al DEA.'},
  {id:'child-call', level:2, prompt:'Estás solo, tienes móvil y un niño no responde. ¿Qué haces?', options:['Un minuto de RCP y después llamo.', 'Llamo al 112 inmediatamente en altavoz.', 'Primero salgo a buscar un DEA.'], answer:1, explanation:'Con móvil, llama inmediatamente. El minuto antes de ir a buscar ayuda se reserva para estar solo sin teléfono disponible.'},
  {id:'child-breaths', level:2, prompt:'Un niño no responde y no respira normalmente. ¿Qué ventilaciones iniciales se enseñan?', options:['Ninguna: en niños no se ventila.', 'Dos.', 'Cinco ventilaciones iniciales.'], answer:2, explanation:'Se enseñan 5 ventilaciones iniciales y después compresiones. Si no puedes ventilar, empieza a comprimir y añade ventilaciones cuando sea posible.'},
  {id:'child-ratio', level:2, prompt:'¿De qué depende usar 15:2 en pediatría?', options:['De tener formación específica en SVB pediátrico.', 'De ser sanitario, sin importar la formación.', 'De que haya dos personas, siempre.'], answer:0, explanation:'15:2 corresponde a formación específica en SVB pediátrico. En los demás casos, 30:2 siguiendo al 112.'},
  {id:'child-depth', level:2, prompt:'¿Cómo eliges la profundidad en un niño?', options:['Siempre 4 cm, a cualquier edad.', 'Siempre 6 cm, aunque sea un bebé.', 'Al menos un tercio del tórax; en adolescentes, 5–6 cm.'], answer:2, explanation:'Adapta la profundidad al grosor del tórax, sin superar 6 cm a ninguna edad. En adolescentes se aplica 5–6 cm.'},
  {id:'aed-touch', level:2, prompt:'¿Cuándo debe estar todo el mundo sin tocar a la persona?', options:['Durante toda la reanimación.', 'Durante el análisis y la descarga del DEA.', 'Solo mientras se enciende el DEA.'], answer:1, explanation:'Nadie toca a la persona durante el análisis ni la descarga. Si hay dos reanimadores, se pueden mantener las compresiones mientras se colocan los parches.'},
];

export const scenario = {
  start: {title:'En el gimnasio del instituto…', text:'Durante una actividad, un adulto se desploma. Antes de acercarte, ¿qué haces?', options:[['Compruebo que el entorno es seguro.', 'response'], ['Me acerco sin mirar.', 'unsafe']]},
  unsafe: {title:'Primero, tu seguridad.', text:'Si hay un peligro, podrías convertirte en otra víctima. Comprueba el entorno antes de acercarte.', options:[['Compruebo el entorno.', 'response']]},
  response: {title:'El entorno es seguro.', text:'Te acercas. Le hablas y tocas suavemente sus hombros. ¿Responde?', options:[['Sí, responde.', 'awake'], ['No responde.', 'call']]},
  awake: {title:'Responder no significa que todo esté bien.', text:'Atiende a lo que le ocurre y vigila su estado. Si necesita ayuda urgente, llama al 112. En este caso simulado, vamos a ensayar qué pasaría si no respondiera.', options:[['Ensayar el caso: no responde.', 'call']]},
  call: {title:'No responde: llama al 112 ya.', text:'Pon el móvil en altavoz o pide a alguien que llame. Di dónde estás y que no responde. No esperes a comprobar la respiración para llamar.', options:[['He avisado: compruebo su respiración.', 'breathing']]},
  breathing: {title:'Mientras se conecta la llamada…', text:'Abre la vía aérea con frente-mentón. Mira, escucha y siente durante no más de 10 segundos. ¿Respira normalmente?', options:[['Sí, claramente con normalidad.', 'normal'], ['No, solo jadea o tengo dudas.', 'cpr']]},
  normal: {title:'Vigila la respiración.', text:'Sigue al 112. Mantén abierta la vía aérea y vigila continuamente. Sin sospecha de traumatismo, puedes usar la posición lateral de seguridad. Si deja de respirar normalmente, inicia RCP.', options:[['En el simulacro deja de respirar normalmente.', 'cpr']]},
  cpr: {title:'Empieza RCP.', text:`Comprime el centro del pecho a ${protocol.rate}/minuto y ${protocol.adultDepth}, dejando que suba completamente. Si sabes y puedes, haz ${protocol.adultRatio}; si no, compresiones continuas. El 112 te guía.`, options:[['Otra persona trae un DEA.', 'aed']]},
  aed: {title:'El DEA te va indicando.', text:'Enciéndelo y coloca los parches en el pecho desnudo siguiendo el dibujo. Nadie toca a la persona durante el análisis ni la descarga. ¿Qué haces después, descargue o no?', options:[['Reanudo inmediatamente la RCP.', 'done'], ['Espero sin comprimir.', 'wait']]},
  wait: {title:'Las compresiones deben continuar.', text:'Reanuda RCP inmediatamente tanto si ha descargado como si no recomienda descargar. Escucha las siguientes instrucciones.', options:[['Reanudo las compresiones.', 'done']]},
  done: {title:'Has ensayado cómo actuar.', text:'Seguridad → respuesta → llamada temprana al 112 → respiración → RCP y DEA. Continúa hasta que te releven los profesionales, recupere signos de vida con respiración normal, no puedas seguir o el entorno sea inseguro.', options:[['Volver a empezar.', 'start']]},
};
