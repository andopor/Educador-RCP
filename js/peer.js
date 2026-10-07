import { protocol } from './content.js';

export const rubrics = [
  { id: 'compresiones', title: 'Técnica de compresiones', description: 'Observa la postura y la calidad de las compresiones en un maniquí de adulto.', criteria: [
    'Coloca el talón de una mano en la mitad inferior del esternón.',
    'Coloca la otra mano encima y entrelaza los dedos, sin presionar las costillas.',
    'Mantiene los hombros verticalmente sobre las manos.',
    'Mantiene los brazos rectos durante las compresiones.',
    `Comprime a una profundidad de ${protocol.adultDepth}.`,
    `Mantiene un ritmo de ${protocol.rate} compresiones por minuto.`,
    'Deja que el pecho suba completamente, sin apoyarse entre compresiones.',
    'Reduce al mínimo las interrupciones.',
  ] },
  { id: 'adulto', title: 'RCP en adultos', description: 'Ensayad la secuencia completa en un maniquí de adulto, incluida la llamada simulada al 112.', criteria: [
    'Comprueba que acercarse es seguro.',
    'Comprueba la respuesta hablando y tocando suavemente los hombros.',
    'Pide ayuda y llama al 112 inmediatamente si no responde, en altavoz.',
    'Abre la vía aérea con la maniobra frente-mentón.',
    'Comprueba la respiración durante no más de 10 segundos mientras se conecta la llamada.',
    'Reconoce que los jadeos no son respiración normal e inicia RCP si no responde y no respira normalmente.',
    'Coloca las manos en la mitad inferior del esternón, con brazos rectos.',
    `Comprime ${protocol.adultDepth} a ${protocol.rate} por minuto.`,
    'Permite la reexpansión completa del pecho y reduce las interrupciones.',
    'Realiza 30:2 si sabe y puede ventilar, o compresiones continuas si no puede.',
    'Si practica ventilaciones: abre la vía aérea, pinza la nariz y eleva el pecho con cada soplo de aproximadamente 1 segundo; si no puede, mantiene compresiones continuas.',
    'Sigue el DEA: nadie toca durante análisis/descarga y reanuda RCP inmediatamente, descargue o no.',
  ] },
  { id: 'nino', title: 'RCP en niños', description: 'Ensayad con un maniquí pediátrico y la orientación de vuestro docente.', criteria: [
    'Comprueba la seguridad y la respuesta sin estímulos dolorosos.',
    'Pide ayuda y llama al 112 inmediatamente en altavoz si tiene móvil.',
    'Abre la vía aérea y comprueba la respiración en no más de 10 segundos.',
    'Reconoce la respiración ausente o anormal e inicia la reanimación.',
    'Da 5 ventilaciones iniciales; si no puede, empieza compresiones sin retrasarlas.',
    'Adapta las manos al tamaño: una o dos en niños; dos pulgares rodeando el tórax en lactantes.',
    'Comprime al menos un tercio del grosor del tórax; en adolescentes, 5–6 cm; nunca supera 6 cm.',
    `Mantiene ${protocol.rate} compresiones/minuto y permite que el pecho suba completamente.`,
    'Usa 15:2 con formación específica en SVB pediátrico; en los demás casos, 30:2 siguiendo al 112.',
    'Explica que solo si está solo y sin teléfono hace 1 minuto de RCP antes de alejarse para buscar ayuda.',
  ] },
];

export function peerResult(criteria, answers) {
  const total = criteria.length;
  const answered = criteria.filter((_, index) => typeof answers[index] === 'boolean').length;
  const achieved = criteria.filter((_, index) => answers[index] === true).length;
  return {
    total, answered, achieved,
    complete: total > 0 && answered === total,
    score: total > 0 && answered === total ? achieved / total * 10 : null,
    missing: criteria.flatMap((_, index) => typeof answers[index] === 'boolean' ? [] : [index]),
    improve: criteria.filter((_, index) => answers[index] === false),
  };
}
