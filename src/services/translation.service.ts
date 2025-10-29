import { Injectable, signal, computed, Signal } from '@angular/core';

type Translations = {
  [key: string]: { en: string; es: string; pt?: string; }
};

const translations: Translations = {
  // Header
  'nav.about': { en: 'About Us', es: 'Nosotros', pt: 'Sobre Nós' },
  'nav.apartments': { en: 'Apartments', es: 'Departamentos', pt: 'Apartamentos' },
  'nav.artinHouseI': { en: 'Artin House I', es: 'Artin House I', pt: 'Artin House I' },
  'nav.artinHouseII': { en: 'Artin House II', es: 'Artin House II', pt: 'Artin House II' },
  'nav.amenities': { en: 'Amenities', es: 'Comodidades', pt: 'Comodidades' },
  'nav.gallery': { en: 'Gallery', es: 'Galería', pt: 'Galeria' },
  'nav.contact': { en: 'Contact', es: 'Contacto', pt: 'Contato' },
  'nav.bookNow': { en: 'Book Now', es: 'Reservar', pt: 'Reservar' },
  'nav.policies': { en: 'Our Policies', es: 'Nuestras Políticas', pt: 'Nossas Políticas' },

  // Hero

    // Hero
  'hero.title': { en: 'Your Oasis in Mendoza', es: 'Tu Oasis en Mendoza', pt: 'Seu Oásis em Mendoza' },
  'hero.subtitle': { en: "Experience tranquility and comfort surrounded by Mendoza's stunning landscapes.", es: 'Experimenta la tranquilidad y el confort rodeado de los impresionantes paisajes de Mendoza.', pt: 'Experimente tranquilidade e conforto cercado pelas paisagens deslumbrantes de Mendoza.' },
  'hero.subtitle1': { en: "Temporary homestay", es: 'Alquiler temporario', pt: 'Aluguel temporário' },
  'hero.button': { en: 'Reserve Your Stay', es: 'Reserva Tu Estadía', pt: 'Reserve Sua Estadia' },

    // Apartments
  'apartments.title': { en: 'Our Accommodations', es: 'Nuestros Alojamientos', pt: 'Nossas Acomodações' },
  'apartments.subtitle': { en: 'Choose between our two beautifully designed apartments, each offering a unique and comfortable experience.', es: 'Elige entre nuestros dos apartamentos elegantemente diseñados, cada uno ofrece una experiencia única y cómoda.', pt: 'Escolha entre nossos dois apartamentos elegantemente projetados, cada um oferecendo uma experiência única e confortável.' },
  'apartments.artin1.title': { en: 'Artin House I', es: 'Artin House I', pt: 'Artin House I' },
  'apartments.artin1.desc': { en: 'A spacious and bright apartment perfect for families or small groups. Features a fully equipped kitchen, modern amenities, and direct access to the garden.', es: 'Un apartamento amplio y luminoso perfecto para familias o grupos pequeños. Cuenta con cocina totalmente equipada, comodidades modernas y acceso directo al jardín.', pt: 'Um apartamento espaçoso e luminoso perfeito para famílias ou grupos pequenos. Possui cozinha totalmente equipada, comodidades modernas e acesso direto ao jardim.' },
  'apartments.artin1.guests': { en: 'Sleeps up to 5 guests', es: 'Capacidad para 5 huéspedes', pt: 'Capacidade para 5 hóspedes' },
  'apartments.artin1.rooms': { en: '2 Bedrooms, 1 Bathroom', es: '2 Habitaciones, 1 Baño', pt: '2 Quartos, 1 Banheiro' },
  'apartments.artin2.title': { en: 'Artin House II', es: 'Artin House II', pt: 'Artin House II' },
  'apartments.artin2.desc': { en: 'An intimate and cozy retreat, perfect for an unforgettable getaway. Whether it’s a romantic escape for a couple or a well-deserved break with friends, this apartment offers an exclusive private patio and serene views that invite you to disconnect.', es: 'Un refugio íntimo y acogedor, perfecto para una escapada inolvidable. Ya sea una aventura romántica en pareja o un merecido descanso entre amigos, este apartamento te ofrece un patio privado exclusivo y vistas serenas que invitan a la desconexión.', pt: 'Um refúgio íntimo e acolhedor, ideal para uma escapada inesquecível. Seja para uma aventura romântica a dois ou um merecido descanso entre amigos, este apartamento oferece um pátio privado exclusivo e vistas serenas que convidam ao relaxamento.' },
  'apartments.artin2.guests': { en: 'Sleeps up to 2 guests', es: 'Capacidad para 2 huéspedes', pt: 'Capacidade para 2 hóspedes' },
  'apartments.artin2.rooms': { en: '1 Bedroom, 1 Bathroom', es: '1 Habitación, 1 Baño', pt: '1 Quarto, 1 Banheiro' },
  

  // About
  'about.title': { en: 'Welcome to Artin House Mendoza', es: 'Bienvenidos a Artin House Mendoza', pt: 'Bem-vindos à Artin House Mendoza' },
  'about.location.title': { en: 'Prime Location in Luján de Cuyo', es: 'Ubicación Privilegiada en Luján de Cuyo', pt: 'Localização Privilegiada em Luján de Cuyo' },
  'about.location.desc': { en: 'Located in the heart of the famous Luján de Cuyo Wine Route, the "Land of Malbec." You will be surrounded by wineries and just 5 minutes from the renowned gastronomic neighborhood of Chacras de Coria. Enjoy a vibrant atmosphere, steps away from charming coffee shops, delicious restaurants, and the main square.', es: 'Ubicados en el corazón de la famosa Ruta del Vino de Luján de Cuyo, la "Tierra del Malbec". Estarás rodeado de bodegas y a solo 5 minutos del reconocido barrio gastronómico de Chacras de Coria. Disfruta de un ambiente vibrante, a pasos de cafeterías, restaurantes deliciosos y la plaza principal.', pt: 'Localizados no coração da famosa Rota do Vinho de Luján de Cuyo, a "Terra do Malbec". Você estará cercado por vinícolas e a apenas 5 minutos do renomado bairro gastronômico de Chacras de Coria. Desfrute de um ambiente vibrante, a poucos passos de charmosas cafeterias, deliciosos restaurantes e da praça principal.' },
  'about.experience.title': { en: 'Come and Enjoy the Best Quality of Life in Mendoza!', es: '¡Vení y Disfrutá la Mejor Calidad de Vida en Mendoza!', pt: 'Venha e Desfrute da Melhor Qualidade de Vida em Mendoza!' },
  'about.hosts.title': { en: 'Your Hosts in Mendoza', es: 'Tus Anfitriones en Mendoza', pt: 'Seus Anfitriões em Mendoza' },
  'about.hosts.desc': { en: 'I am Elizabeth, your host in Mendoza, and I want you to feel at home from the moment you arrive. As someone who loves sharing the beauty of Mendoza,I will offer you personalized recommendations for wineries, restaurants, and hidden gems that only locals know about.', es: 'Soy Elizabeth, tu anfitriona en Mendoza, y quiero que te sientas como en casa desde el momento en que llegues. Como alguien que ama compartir la belleza de Mendoza, te ofreceré recomendaciones personalizadas de bodegas, restaurantes y lugares escondidos que solo conocen los locales.', pt: 'Sou Elizabeth, sua anfitriã em Mendoza, e quero que você se sinta em casa desde o momento da chegada. Como alguém que adora compartilhar a beleza de Mendoza, darei recomendações personalizadas de vinícolas, restaurantes e preciosidades escondidas, conhecidas apenas pelos moradores locais.' },
  'about.rules.title': { en: 'Simple House Rules', es: 'Normas Sencillas de la Casa', pt: 'Regras Simples da Casa' },
  'about.rules.desc': { en: 'Our house rules are simple but very important for everyone\'s comfort: no smoking inside the property, no parties, and no additional guests beyond those registered. We want everyone to enjoy a peaceful and respectful environment.', es: 'Nuestras normas de la casa son sencillas pero muy importantes para el confort de todos: no fumar dentro de la propiedad, no fiestas y no huéspedes adicionales más allá de los registrados. Queremos que todos disfruten de un ambiente tranquilo y respetuoso.', pt: 'Nossas regras da casa são simples, mas muito importantes para o conforto de todos: não fumar dentro da propriedade, sem festas e sem hóspedes adicionais além dos registrados. Queremos que todos desfrutem de um ambiente tranquilo e respeitoso.' },
  
  // Policies Page
  'policies.title': { en: 'Our Policies - Artin House I & II', es: 'Nuestras Políticas – Artin House I & II', pt: 'Nossas Políticas - Artin House I & II' },
  'policies.welcome': { en: 'Welcome to **Artin House**, your apartments in the heart of Luján de Cuyo, Mendoza. We want your stay to be pleasant and comfortable. Below, we detail everything you need to know about our facilities, services, booking conditions, and house rules.', es: 'Bienvenidos a **Artin House**, tus departamentos en el corazón de Luján de Cuyo, Mendoza. Queremos que tu estadía sea placentera y cómoda. A continuación, te detallamos todo lo que necesitas saber sobre nuestras instalaciones, servicios, condiciones de reserva y normas de la casa.', pt: 'Bem-vindos à **Artin House**, seus apartamentos no coração de Luján de Cuyo, Mendoza. Queremos que sua estadia seja agradável e confortável. Abaixo, detalhamos tudo o que você precisa saber sobre nossas instalações, serviços, condições de reserva e regras da casa.' },
  
  'policies.apartments.title': { en: 'Our Apartments', es: 'Nuestros Departamentos', pt: 'Nossos Apartamentos' },
  'policies.apartments.desc': { en: 'Artin House consists of two independent and fully equipped apartments:', es: 'Artin House se compone de dos departamentos independientes y totalmente equipados:', pt: 'A Artin House consiste em dois apartamentos independentes e totalmente equipados:' },
  'policies.apartments.house1': { en: '**Artin House I:** Capacity for up to **5 guests**. Ideal for families.', es: '**Artin House I:** Capacidad para hasta **5 huéspedes**. Ideal para familias.', pt: '**Artin House I:** Capacidade para até **5 hóspedes**. Ideal para famílias.' },
  'policies.apartments.house2': { en: '**Artin House II:** Capacity for **2 guests**. Perfect for couples or friends.', es: '**Artin House II:** Capacidad para **2 huéspedes**. Perfecto para parejas.', pt: '**Artin House II:** Capacidade para **2 hóspedes**. Perfeito para casais ou amigos.' },
  
  'policies.amenities.title': { en: 'Amenities and Services', es: 'Comodidades y Servicios', pt: 'Comodidades e Serviços' },
  'policies.amenities.desc': { en: 'We offer a complete environment so you can enjoy your visit to the fullest:', es: 'Ofrecemos un entorno completo para que disfrutes al máximo tu visita:', pt: 'Oferecemos um ambiente completo para que você aproveite ao máximo sua visita:' },
  'policies.amenities.general.title': { en: '**General Facilities**', es: '**Instalaciones Generales**', pt: '**Instalações Gerais**' },
  'policies.amenities.general.parking': { en: 'Garage (Parking)', es: 'Cochera (Estacionamiento)', pt: 'Garagem (Estacionamento)' },
  'policies.amenities.general.garden': { en: 'Garden', es: 'Jardín', pt: 'Jardim' },
  'policies.amenities.general.gallery': { en: 'Covered gallery with garden table set', es: 'Galería cubierta con juego de mesa de jardín', pt: 'Galeria coberta com conjunto de mesa de jardim' },
  'policies.amenities.equipment.title': { en: '**Equipment**', es: '**Equipamiento**', pt: '**Equipamentos**' },
  'policies.amenities.equipment.tv': { en: 'Television', es: 'Televisión', pt: 'Televisão' },
  'policies.amenities.equipment.kitchen': { en: 'Equipped kitchen', es: 'Cocina equipada', pt: 'Cozinha equipada' },
  'policies.amenities.equipment.fridge': { en: 'Refrigerator', es: 'Heladera', pt: 'Geladeira' },
  'policies.amenities.equipment.heating': { en: 'Heating', es: 'Calefacción', pt: 'Aquecimento' },
  'policies.amenities.equipment.fan': { en: 'Ceiling fan', es: 'Ventilador de techo', pt: 'Ventilador de teto' },
  'policies.amenities.equipment.microwave': { en: 'Microwave (Available in Artin House II)', es: 'Microondas (Disponible en Artin House II)', pt: 'Micro-ondas (Disponível na Artin House II)' },
  'policies.amenities.services.title': { en: '**Included Services**', es: '**Servicios Incluidos**', pt: '**Serviços Incluídos**' },
  'policies.amenities.services.wifi': { en: 'Wi-Fi Internet', es: 'Internet Wi-Fi', pt: 'Internet Wi-Fi' },
  'policies.amenities.services.bedding': { en: 'Bedding', es: 'Ropa de Cama', pt: 'Roupas de Cama' },
  'policies.amenities.services.towels': { en: 'Towels', es: 'Ropa Blanca (Toallas)', pt: 'Roupas Brancas (Toalhas)' },
  'policies.amenities.security.title': { en: '**Protection and Security**', es: '**Protecciones y Seguridad**', pt: '**Proteção e Segurança**' },
  'policies.amenities.security.breaker': { en: 'Differential Circuit Breaker', es: 'Disyuntor Diferencial', pt: 'Disjuntor Diferencial' },
  'policies.amenities.security.emergency': { en: 'Emergency Light', es: 'Luz de Emergencia', pt: 'Luz de Emergência' },
  'policies.amenities.security.bars': { en: 'Security bars', es: 'Rejas de seguridad', pt: 'Grades de segurança' },
  
  'policies.booking.title': { en: 'Booking Conditions', es: 'Condiciones de la Reserva', pt: 'Condições da Reserva' },
  'policies.booking.advanceTitle': { en: 'Advance Payment', es: 'Pago Anticipado', pt: 'Pagamento Antecipado' },
  'policies.booking.advance': { en: 'To confirm your reservation, we request an **advance payment of 20%** of the total cost as a deposit. The **remaining balance** is paid at check-in.', es: 'Para confirmar tu reserva, solicitamos un **pago anticipado del 20%** del costo total en concepto de seña. El **saldo restante** se abona en el momento del ingreso (Check-in).', pt: 'Para confirmar sua reserva, solicitamos um **pagamento antecipado de 20%** do custo total como depósito. O **saldo restante** é pago no check-in.' },
  'policies.booking.minimumTitle': { en: 'Minimum Stay', es: 'Estadía Mínima', pt: 'Estadia Mínima' },
  'policies.booking.minimum': { en: 'The minimum required stay is **2 Nights**.', es: 'La estadía mínima requerida es de **2 Noches**.', pt: 'A estadia mínima requerida é de **2 Noites**.' },
  'policies.booking.discountTitle': { en: 'Discount', es: 'Descuento', pt: 'Desconto' },
  'policies.booking.discount': { en: 'From **4 nights or more**, you get a **10% discount** on your total reservation.', es: 'A partir de **4 noches o más**, contás con un **10% de descuento** en el total de tu reserva.', pt: 'A partir de **4 noites ou mais**, você recebe um **desconto de 10%** no total da sua reserva.' },
  'policies.booking.payment.title': { en: '**Payment Methods**', es: '**Formas de Pago**', pt: '**Formas de Pagamento**' },
  'policies.booking.payment.desc': { en: 'We accept the following payment methods:', es: 'Aceptamos los siguientes medios de pago:', pt: 'Aceitamos as seguintes formas de pagamento:' },
  'policies.booking.payment.transfer': { en: 'Bank Transfer', es: 'Transferencia Bancaria', pt: 'Transferência Bancária' },
  'policies.booking.payment.card': { en: 'Credit or Debit Card', es: 'Tarjeta de Crédito o Débito', pt: 'Cartão de Crédito ou Débito' },
  'policies.booking.payment.cash': { en: 'Cash', es: 'Efectivo', pt: 'Dinheiro' },
  
  'policies.cancellation.title': { en: 'Cancellation Policy (Flexible)', es: 'Política de Cancelación (Flexible)', pt: 'Política de Cancelamento (Flexível)' },
  'policies.cancellation.desc': { en: 'We offer a flexible cancellation policy for your peace of mind:', es: 'Ofrecemos una política de cancelación flexible para tu tranquilidad:', pt: 'Oferecemos uma política de cancelamento flexível para sua tranquilidade:' },
  'policies.cancellation.reusable': { en: '**Reusable Deposit:** Upon cancellation by the guest, the amount paid as deposit is not lost. It will be assigned as credit in pesos for use in a future reservation.', es: '**Seña Reutilizable:** Ante la cancelación por parte del huésped, el importe abonado en concepto de seña no se pierde. Se asignará como crédito en pesos para utilizar en una futura reserva.', pt: '**Depósito Reutilizável:** Em caso de cancelamento pelo hóspede, o valor pago como depósito não é perdido. Será atribuído como crédito em pesos para uso em uma reserva futura.' },
  'policies.cancellation.validity': { en: '**Credit Validity:** The new reservation must be made within 6 months after the original cancellation and will be subject to availability of our apartments.', es: '**Vigencia del Crédito:** La nueva reserva deberá realizarse dentro de los 6 meses posteriores a la cancelación original y estará sujeta a la disponibilidad de nuestros departamentos.', pt: '**Validade do Crédito:** A nova reserva deve ser feita dentro de 6 meses após o cancelamento original e estará sujeita à disponibilidade dos nossos apartamentos.' },
  
  'policies.schedule.title': { en: 'Check-in and Check-out Times', es: 'Horarios de Ingreso y Egreso', pt: 'Horários de Check-in e Check-out' },
  'policies.schedule.checkin': { en: '**Check-in:** 11:00 AM', es: '**Check-in (Ingreso):** 11:00 hs', pt: '**Check-in (Entrada):** 11:00h' },
  'policies.schedule.checkout': { en: '**Check-out:** 3:00 PM', es: '**Check-out (Egreso):** 15:00 hs', pt: '**Check-out (Saída):** 15:00h' },
  
  'policies.rules.title': { en: 'Accommodation Rules', es: 'Normas del Alojamiento', pt: 'Regras de Acomodação' },
  'policies.rules.desc': { en: 'Our rules are simple and essential to ensure harmonious coexistence and care for our facilities:', es: 'Nuestras normas son sencillas y esenciales para garantizar una convivencia armoniosa y el cuidado de nuestras instalaciones:', pt: 'Nossas regras são simples e essenciais para garantir uma convivência harmoniosa e cuidado com nossas instalações:' },
  'policies.rules.suitable.title': { en: 'Suitable for:', es: 'Apto para:', pt: 'Adequado para:' },
  'policies.rules.suitable.babies': { en: 'Babies (0 to 2 years)', es: 'Bebés (0 a 2 años)', pt: 'Bebês (0 a 2 anos)' },
  'policies.rules.suitable.children': { en: 'Children (+2 to 12 years)', es: 'Niños (+2 a 12 años)', pt: 'Crianças (+2 a 12 anos)' },
  'policies.rules.suitable.families': { en: 'Families', es: 'Familias', pt: 'Famílias' },
  'policies.rules.suitable.couples': { en: 'Couples', es: 'Parejas', pt: 'Casais' },
  'policies.rules.notSuitable.title': { en: 'Not suitable for:', es: 'No Apto para:', pt: 'Não adequado para:' },
  'policies.rules.notSuitable.mobility': { en: 'People with reduced mobility (unfortunately, our facilities are not adapted)', es: 'Personas con movilidad reducida (lamentablemente, nuestras instalaciones no están adaptadas)', pt: 'Pessoas com mobilidade reduzida (infelizmente, nossas instalações não estão adaptadas)' },
  'policies.rules.smoking.title': { en: 'No Smoking', es: 'Prohibido Fumar', pt: 'Proibido Fumar' },
  'policies.rules.smoking.desc': { en: 'Smoking is not permitted inside the property.', es: 'No está permitido fumar dentro de la propiedad.', pt: 'Não é permitido fumar dentro da propriedade.' },
  'policies.rules.parties.title': { en: 'No Parties', es: 'Prohibidas las Fiestas', pt: 'Proibidas as Festas' },
  'policies.rules.parties.desc': { en: 'Parties or loud events are not allowed.', es: 'No están permitidas fiestas o eventos ruidosos.', pt: 'Festas ou eventos barulhentos não são permitidos.' },
  'policies.rules.guests.title': { en: 'Registered Guests Only', es: 'Solo Huéspedes Registrados', pt: 'Apenas Hóspedes Registrados' },
  'policies.rules.guests.desc': { en: 'Additional guests beyond those registered are not permitted.', es: 'No se permiten huéspedes adicionales a los registrados.', pt: 'Hóspedes adicionais além dos registrados não são permitidos.' },
  'policies.rules.noise.title': { en: 'Quiet Hours', es: 'Horarios de Silencio', pt: 'Horários de Silêncio' },
  'policies.rules.noise.desc': { en: 'Please maintain quiet hours from 10:00 PM to 8:00 AM.', es: 'Por favor mantenga horarios de silencio de 22:00 a 08:00 hs.', pt: 'Por favor, mantenham horários de silêncio das 22:00 às 08:00h.' },
  
  'policies.deposit.title': { en: '🛡️ Guarantee Policy (Security Deposit)', es: '🛡️ Política de Garantía (Depósito de Seguridad)', pt: '🛡️ Política de Garantia (Depósito de Segurança)' },
  'policies.deposit.desc': { en: 'To protect our facilities and contents, a Security Deposit (or Bond) will be requested upon check-in.', es: 'Para proteger nuestras instalaciones y sus contenidos, se solicitará un Depósito en Garantía (o Fianza) al momento de tu ingreso.', pt: 'Para proteger nossas instalações e conteúdos, um Depósito de Segurança (ou Caução) será solicitado no check-in.' },
  'policies.deposit.amount': { en: '**Deposit Amount:** The value will be equivalent to the cost of one (1) night of accommodation.', es: '**Monto del Depósito:** El valor será equivalente al costo de una (1) noche de alojamiento.', pt: '**Valor do Depósito:** O valor será equivalente ao custo de uma (1) noite de acomodação.' },
  'policies.deposit.purpose': { en: '**Purpose:** This deposit is retained as collateral to cover possible material damage, breakage, or missing items that may occur during the stay.', es: '**Finalidad:** Este depósito se retendrá como fianza para cubrir posibles daños materiales, roturas o faltantes que pudieran ocurrir durante la estadía.', pt: '**Finalidade:** Este depósito é retido como garantia para cobrir possíveis danos materiais, quebras ou itens em falta que possam ocorrer durante a estadia.' },
    'policies.deposit.payment': { en: '**Payment Methods:** The deposit can be paid by bank transfer, cash, or credit/debit card pre-authorization at check-in. Refund will be made by the same method, or by bank transfer if paid in cash.', es: '**Formas de Pago:** El depósito puede ser abonado mediante transferencia bancaria, en efectivo o mediante pre-autorización en tarjeta de crédito/débito al momento del Check-in. La devolución se realizará por el mismo medio, o por transferencia bancaria en caso de haber sido abonado en efectivo.', pt: '**Formas de Pagamento:** O depósito pode ser pago por transferência bancária, em dinheiro ou por pré-autorização no cartão de crédito/débito no check-in. O reembolso será feito pelo mesmo método, ou por transferência bancária se pago em dinheiro.' },
  'policies.deposit.refund': { en: '**Refund:** The amount will be refunded in full (by the same payment method) on check-out day, once the property has been reviewed and verified that there is no damage.', es: '**Reintegro:** El importe será reintegrado en su totalidad (por el mismo medio de pago) el día del Check-out, una vez que se haya revisado la propiedad y verificado que no existen daños.', pt: '**Reembolso:** O valor será reembolsado integralmente (pelo mesmo método de pagamento) no dia do check-out, uma vez que a propriedade tenha sido revisada e verificado que não há danos.' },
  'policies.deposit.damages': { en: '**In case of damage:** If damage or theft is found, the cost of repair or replacement will be deducted from the deposit. If the damage exceeds the guarantee amount, the guest must cover the difference.', es: '**En caso de daños:** Si se constatan daños o hurtos, el costo de reparación o reposición se descontará del depósito. Si el daño supera el monto de la garantía, el huésped deberá cubrir a diferença.', pt: '**Em caso de danos:** Se forem constatados danos ou furtos, o custo de reparo ou substituição será deduzido do depósito. Se o dano exceder o valor da garantia, o hóspede deve cobrir a diferença.' },
  
  'policies.thankYou': { en: '**Thank you for choosing Artin House! We look forward to welcoming you soon in Luján de Cuyo.**', es: '**¡Gracias por elegir Artin House! Esperamos recibirlos pronto en Luján de Cuyo.**', pt: '**Obrigado por escolher a Artin House! Esperamos recebê-los em breve em Luján de Cuyo.**' },
  
  // Amenities
  'amenities.title': { en: 'Comforts & Conveniences', es: 'Comodidades y Servicios', pt: 'Confortos e Conveniências' },
  'amenities.wifi': { en: 'High-Speed Wi-Fi', es: 'Wi-Fi', pt: 'Wi-Fi de Alta Velocidade' },
  'amenities.parking': { en: 'Free Parking', es: 'Estacionamiento Gratuito', pt: 'Estacionamento Gratuito' },
  'amenities.fan': { en: 'Ceiling Fan', es: 'Ventilador', pt: 'Ventilador de Teto' },
  'amenities.microwave': { en: 'Microwave', es: 'Microondas', pt: 'Micro-ondas' },
  'amenities.heating': { en: 'Heating', es: 'Calefacción', pt: 'Aquecimento' },
  'amenities.kitchen': { en: 'Fully Equipped Kitchen', es: 'Cocina Equipada', pt: 'Cozinha Totalmente Equipada' },
  'amenities.barbecue': { en: 'Barbecue', es: 'Parrilla', pt: 'Churrasqueira' },
  'amenities.tv': { en: 'Smart TV', es: 'Smart TV', pt: 'Smart TV' },
  'amenities.garden': { en: 'Private Garden', es: 'Jardín Privado', pt: 'Jardim Privado' },

  // Gallery
  'gallery.title': { en: 'Explore Artin House', es: 'Explora Artin House', pt: 'Explore a Artin House' },
  'gallery.alt.dormitorioPrincipal': { en: 'Spacious bedroom with natural light', es: 'Dormitorio espacioso con luz natural', pt: 'Quarto espaçoso com luz natural' },
  'gallery.alt.bedroom': { en: 'Comfortable master bedroom with a king-size bed', es: 'Dormitorio principal cómodo con cama king-size', pt: 'Quarto principal confortável com cama king-size' },
  'gallery.alt.kitchen': { en: 'Fully equipped modern kitchen with an island', es: 'Cocina moderna totalmente equipada con isla', pt: 'Cozinha moderna totalmente equipada com ilha' },
  'gallery.alt.pool': { en: 'Swimming pool surrounded by a lush garden', es: 'Piscina rodeada de un frondoso jardín', pt: 'Piscina cercada por um jardim exuberante' },
  'gallery.alt.bathroom': { en: 'Sleek bathroom with a walk-in shower', es: 'Baño elegante con ducha a ras de suelo', pt: 'Banheiro elegante com chuveiro walk-in' },
  'gallery.alt.exterior': { en: 'Exterior view of the apartment complex', es: 'Vista exterior del complejo de apartamentos', pt: 'Vista exterior do complexo de apartamentos' },
  'gallery.alt.patio': { en: 'Outdoor patio, perfect for barbecues', es: 'Patio exterior con parrilla, perfecto para disfrutar al aire libre', pt: 'Pátio externo com churrasqueira, perfeito para desfrutar ao ar livre' },
  'gallery.alt.bedroom2': { en: 'Cozy second bedroom with twin beds', es: 'Acogedor segundo dormitorio con camas gemelas', pt: 'Segundo quarto aconchegante com camas de solteiro' },
  'gallery.alt.bedroom3': { en: 'Cozy second bedroom with twin beds', es: 'Acogedor segundo dormitorio con camas gemelas', pt: 'Segundo quarto aconchegante com camas de solteiro' },
  'gallery.alt.kitchen1': { en: 'Modern kitchen with appliances', es: 'Cocina moderna con electrodomésticos', pt: 'Cozinha moderna com eletrodomésticos' },
  'gallery.alt.bathroom1': { en: 'Clean and modern bathroom', es: 'Baño limpio y moderno', pt: 'Banheiro limpo e moderno' },
  'gallery.alt.dormitorio': { en: 'Comfortable bedroom', es: 'Habitación cómoda', pt: 'Quarto confortável' },
  'gallery.alt.cocina': { en: 'Kitchen with dining area', es: 'Cocina con área de comedor', pt: 'Cozinha com área de jantar' },
  'gallery.alt.livingRoom': { en: 'Spacious living room with natural light', es: 'Sala de estar espaciosa con luz natural', pt: 'Sala de estar espaçosa com luz natural' },
  
  
  
  // Booking
  'booking.title': { en: 'Make a Reservation', es: 'Haz una Reserva', pt: 'Faça uma Reserva' },
  'booking.subtitle': { en: 'Your Stay', es: 'Tu Estadía', pt: 'Sua Estadia' },
  'booking.apartmentLabel': { en: 'Apartment', es: 'Departamento', pt: 'Apartamento' },
  'booking.checkinLabel': { en: 'Check-in', es: 'Entrada', pt: 'Check-in' },
  'booking.checkoutLabel': { en: 'Check-out', es: 'Salida', pt: 'Check-out' },
  'booking.guestLabel': { en: 'Guests', es: 'Huéspedes', pt: 'Hóspedes' },
  'booking.selectDate': { en: 'Select date', es: 'Seleccionar', pt: 'Selecionar data' },
  'booking.totalStay': { en: 'Total stay', es: 'Estadía total', pt: 'Estadia total' },
  'booking.nights': { en: 'nights', es: 'noches', pt: 'noites' },
  'booking.bookButton': { en: 'Request to Book', es: 'Solicitar Reserva', pt: 'Solicitar Reserva' },
  'booking.successMsg': { en: 'Booking request sent! We will contact you shortly.', es: '¡Solicitud de reserva enviada! Te contactaremos a la brevedad.', pt: 'Solicitação de reserva enviada! Entraremos em contato em breve.' },
  'booking.discount.applied': { en: '🎉 10% Discount (4+ nights):', es: '🎉 Descuento 10% (4+ noches):', pt: '🎉 Desconto 10% (4+ noites):' },
  'booking.discount.savings': { en: 'You save:', es: 'Ahorras:', pt: 'Você economiza:' },
  'booking.discount.finalPrice': { en: 'Final Total:', es: 'Total Final:', pt: 'Total Final:' },
  'booking.discount.hint': { en: '💡 Book 4+ nights and get 10% discount!', es: '💡 ¡Reserva 4+ noches y obtén 10% de descuento!', pt: '💡 Reserve 4+ noites e ganhe 10% de desconto!' },
  'booking.subtotal': { en: 'Subtotal:', es: 'Subtotal:', pt: 'Subtotal:' },
  'booking.dollarRates': { 
    en: 'For USD rates, please contact us:', 
    es: 'Para tarifas en dólares, consultanos:', 
    pt: 'Para tarifas em dólares, consulte-nos:' 
  },
  'booking.contactWhatsApp': { 
    en: 'WhatsApp', 
    es: 'WhatsApp', 
    pt: 'WhatsApp' 
  },
  'booking.contactEmail': { 
    en: 'Email', 
    es: 'Email', 
    pt: 'Email' 
  },
  'booking.contactForm': { 
    en: 'Contact Form', 
    es: 'Formulario de Consulta', 
    pt: 'Formulário de Consulta' 
  },

  // Home apartment navigation
  'home.viewArtinHouseI': { en: 'View Artin House I', es: 'Ver Artin House I', pt: 'Ver Artin House I' },
  'home.viewArtinHouseII': { en: 'View Artin House II', es: 'Ver Artin House II', pt: 'Ver Artin House II' },
  'booking.errorMsg': { en: 'Please select valid check-in and check-out dates.', es: 'Por favor, selecciona fechas de entrada y salida válidas.', pt: 'Por favor, selecione datas válidas de check-in e check-out.' },
  'booking.weekdays.sun': { en: 'Sun', es: 'Dom', pt: 'Dom' },
  'booking.weekdays.mon': { en: 'Mon', es: 'Lun', pt: 'Seg' },
  'booking.weekdays.tue': { en: 'Tue', es: 'Mar', pt: 'Ter' },
  'booking.weekdays.wed': { en: 'Wed', es: 'Mié', pt: 'Qua' },
  'booking.weekdays.thu': { en: 'Thu', es: 'Jue', pt: 'Qui' },
  'booking.weekdays.fri': { en: 'Fri', es: 'Vie', pt: 'Sex' },
  'booking.weekdays.sat': { en: 'Sat', es: 'Sáb', pt: 'Sáb' },
  
  // Booking Payment Section
  'booking.payment.methods': { en: 'Accepted Payment Methods', es: 'Medios de Pago Habilitados', pt: 'Métodos de Pagamento Aceitos' },
  'booking.payment.creditCard': { en: '💳 Credit Card', es: '💳 Tarjeta de crédito', pt: '💳 Cartão de crédito' },
  'booking.payment.debitCard': { en: '💳 Debit Card', es: '💳 Tarjeta de débito', pt: '💳 Cartão de débito' },
  'booking.payment.bankTransfer': { en: '💸 Bank Transfer', es: '💸 Transferencia bancaria', pt: '💸 Transferência bancária' },
  'booking.payment.cash': { en: '💵 Cash', es: '💵 Efectivo', pt: '💵 Dinheiro' },
  'booking.payment.information': { en: 'Information', es: 'Información', pt: 'Informação' },
  'booking.payment.deposit': { en: 'Required deposit:', es: 'Seña requerida:', pt: 'Depósito requerido:' },
  'booking.payment.depositAmount': { en: '20% of total stay', es: '20% del total de la estadía', pt: '20% do total da estadia' },
  'booking.payment.checkinTime': { en: 'Check-in:', es: 'Check-in:', pt: 'Check-in:' },
  'booking.payment.checkinValue': { en: 'From 3:00 PM', es: 'A partir de las 15:00 hs', pt: 'A partir das 15:00h' },
  'booking.payment.checkoutTime': { en: 'Check-out:', es: 'Check-out:', pt: 'Check-out:' },
  'booking.payment.checkoutValue': { en: 'Until 11:00 AM', es: 'Hasta las 11:00 hs', pt: 'Até às 11:00h' },
  'booking.payment.discountInfo': { en: 'Discount:', es: 'Descuento:', pt: 'Desconto:' },
  'booking.payment.discountValue': { en: '10% for stays of more than 7 nights', es: '10% en estadías de más de 7 noches', pt: '10% para estadias de mais de 7 noites' },
  'booking.confirmationMessage': { en: 'Booking request sent successfully! We will contact you to confirm availability and payment details.', es: '¡Solicitud de reserva enviada correctamente! Nos pondremos en contacto contigo para confirmar disponibilidad y detalles de pago.', pt: 'Solicitação de reserva enviada com sucesso! Entraremos em contato para confirmar disponibilidade e detalhes de pagamento.' },
  
  // Reviews Section
  'reviews.title': { en: 'Artin House Reviews', es: 'Valoraciones de Artin House', pt: 'Avaliações da Artin House' },
  'reviews.totalReviews': { en: 'reviews', es: 'valoraciones', pt: 'avaliações' },

  // Booking Platforms Section
  'bookingPlatforms.title': { en: 'Book on External Platforms', es: 'También podes encontrarnos en las siguientes plataformas', pt: 'Também pode nos encontrar nas seguintes plataformas' },
  'bookingPlatforms.subtitle': { en: 'You can also find us on these platforms', es: 'También puedes encontrarnos en estas plataformas', pt: 'Você também pode nos encontrar nessas plataformas' },
  
  // Footer
  'footer.subtitle': { en: "Your home away from home in the heart of Argentina's wine country.", es: 'Tu hogar lejos de casa en el corazón de la tierra del vino de Argentina.', pt: 'Sua casa longe de casa no coração da região vinícola da Argentina.' },
  'footer.contactTitle': { en: 'Contact Us', es: 'Contáctanos', pt: 'Contate-nos' },
  'footer.navigationTitle': { en: 'Quick Links', es: 'Enlaces Rápidos', pt: 'Links Rápidos' },
  'footer.contactLink': { en: 'Contact', es: 'Contacto', pt: 'Contato' },
  'footer.mendozaGuideLink': { en: 'What to do in Mendoza', es: 'Qué hacer en Mendoza', pt: 'O que fazer em Mendoza' },
  'footer.followTitle': { en: 'Follow Us', es: 'Síguenos', pt: 'Siga-nos' },
  'footer.locationTitle': { en: 'Location', es: 'Ubicación', pt: 'Localização' },
  'footer.copyright': { en: 'All rights reserved.', es: 'Todos los derechos reservados.', pt: 'Todos os direitos reservados.' },

  // Contact
  'contact.title': { en: 'Get in Touch', es: 'Contáctanos', pt: 'Entre em Contato' },
  'contact.subtitle': { en: 'Discover our oasis of tranquility in Mendoza and experience an unforgettable stay', es: 'Descubre nuestro oasis de tranquilidad en Mendoza y vive una estadía inolvidable', pt: 'Descubra nosso oásis de tranquilidade em Mendoza e tenha uma estadia inesquecível' },
  'contact.formTitle': { en: 'Send us a Message', es: 'Envíanos un Mensaje', pt: 'Envie-nos uma Mensagem' },
  'contact.nameLabel': { en: 'Full Name', es: 'Nombre Completo', pt: 'Nome Completo' },
  'contact.emailLabel': { en: 'Email Address', es: 'Dirección de Email', pt: 'Endereço de Email' },
  'contact.phoneLabel': { en: 'Phone Number', es: 'Número de Teléfono', pt: 'Número de Telefone' },
  'contact.apartmentLabel': { en: 'Interested in', es: 'Interesado en', pt: 'Interessado em' },
  'contact.messageLabel': { en: 'Message', es: 'Mensaje', pt: 'Mensagem' },
  'contact.sendButton': { en: 'Send Message', es: 'Enviar Mensaje', pt: 'Enviar Mensagem' },
  'contact.locationTitle': { en: 'Our Location', es: 'Nuestra Ubicación', pt: 'Nossa Localização' },
  'contact.successMsg': { en: 'Message sent successfully! We will contact you soon.', es: '¡Mensaje enviado exitosamente! Te contactaremos pronto.', pt: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' },
  'contact.errorMsg': { en: 'Please fill in all required fields.', es: 'Por favor, completa todos los campos requeridos.', pt: 'Por favor, preencha todos os campos obrigatórios.' },

  // Apartment Detail Page
  'apartmentDetail.home': { en: 'Home', es: 'Inicio', pt: 'Início' },
  'apartmentDetail.description': { en: 'Description', es: 'Descripción', pt: 'Descrição' },
  'apartmentDetail.amenities': { en: 'Amenities', es: 'Amenidades', pt: 'Comodidades' },
  'apartmentDetail.bookingTitle': { en: 'Interested in this accommodation?', es: '¿Te interesa este alojamiento?', pt: 'Interessado nesta acomodação?' },
  'apartmentDetail.bookingText': { en: 'Check availability and make your reservation', es: 'Consulta disponibilidad y realiza tu reserva', pt: 'Consulte disponibilidade e faça sua reserva' },
  'apartmentDetail.bookingButton': { en: 'Book Now', es: 'Reservar Ahora', pt: 'Reservar Agora' },

  // Apartment I Details
  'apartment.artin-house-i.title': { en: 'Artin House I', es: 'Artin House I', pt: 'Artin House I' },
  'apartment.artin-house-i.description': { en: 'An elegant 2-bedroom apartment with garden view, perfectly equipped for a comfortable stay. Features a full kitchen, spacious living room and private terrace.', es: 'Un elegante departamento de 2 dormitorios con vista al jardín, perfectamente equipado para una estadía confortable. Cuenta con cocina completa, living amplio y terraza privada.', pt: 'Um elegante apartamento de 2 quartos com vista para o jardim, perfeitamente equipado para uma estadia confortável. Possui cozinha completa, sala de estar espaçosa e terraço privativo.' },
  'apartment.artin-house-i.specs.guests': { en: 'Up to 5 guests', es: 'Hasta 5 huéspedes', pt: 'Até 5 hóspedes' },
  'apartment.artin-house-i.specs.rooms': { en: '2 bedrooms', es: '2 dormitorios', pt: '2 quartos' },
  'apartment.artin-house-i.specs.bathrooms': { en: '1 full bathroom', es: '1 baño completo', pt: '1 banheiro completo' },
/*   'apartment.artin-house-i.specs.size': { en: '65 m²', es: '65 m²', pt: '65 m²' }, */

  // Apartment II Details  
  'apartment.artin-house-ii.title': { en: 'Artin House II', es: 'Artin House II', pt: 'Artin House II' },
  'apartment.artin-house-ii.description': { en: 'Cozy 1-bedroom apartment ideal for couples, friends or individual travelers. Modern design with all necessary amenities for a perfect stay.', es: 'Acogedor departamento de 1 dormitorio ideal para parejas, amigos o viajeros individuales. Diseño moderno con todas las comodidades necesarias para una estadía perfecta.', pt: 'Apartamento aconchegante de 1 quarto ideal para casais, amigos ou viajantes individuais. Design moderno com todas as comodidades necessárias para uma estadia perfeita.' },
  'apartment.artin-house-ii.specs.guests': { en: 'Up to 2 guests', es: 'Hasta 2 huéspedes', pt: 'Até 2 hóspedes' },
  'apartment.artin-house-ii.specs.rooms': { en: '1 bedroom', es: '1 dormitorio', pt: '1 quarto' },
  'apartment.artin-house-ii.specs.bathrooms': { en: '1 full bathroom', es: '1 baño completo', pt: '1 banheiro completo' },
/*   'apartment.artin-house-ii.specs.size': { en: '45 m²', es: '45 m²', pt: '45 m²' }, */

  // Amenities translations
  'amenity.wifi': { en: 'Free WiFi', es: 'WiFi gratuito', pt: 'WiFi gratuito' },
  'amenity.airConditioning': { en: 'Air conditioning', es: 'Aire acondicionado', pt: 'Ar condicionado' },
  'amenity.heating': { en: 'Heating', es: 'Calefacción', pt: 'Aquecimento' },
  'amenity.fullKitchen': { en: 'Full kitchen', es: 'Cocina completa', pt: 'Cozinha completa' },
  'amenity.cableTV': { en: 'Cable TV', es: 'TV por cable', pt: 'TV a cabo' },
  'amenity.parking': { en: 'Parking', es: 'Estacionamiento', pt: 'Estacionamento' },
  'amenity.bbqArea': { en: 'BBQ area', es: 'Zona de parrilla', pt: 'Área de churrasqueira' },
  'amenity.garden': { en: 'Garden', es: 'Jardín', pt: 'Jardim' },

  // Image descriptions for Artin House I
  'apartment.artin-house-i.image.masterBedroom': { en: 'Spacious master bedroom with king bed', es: 'Amplio dormitorio principal con cama king', pt: 'Quarto principal espaçoso com cama king' },
  'apartment.artin-house-i.image.kitchen': { en: 'Fully equipped kitchen', es: 'Cocina completamente equipada', pt: 'Cozinha totalmente equipada' },
  'apartment.artin-house-i.image.kitchenView': { en: 'Complete kitchen view', es: 'Vista completa de la cocina', pt: 'Vista completa da cozinha' },
  'apartment.artin-house-i.image.bathroom': { en: 'Full bathroom with shower', es: 'Baño completo con ducha', pt: 'Banheiro completo com chuveiro' },
  'apartment.artin-house-i.image.secondBedroom': { en: 'Cozy second bedroom', es: 'Segundo dormitorio acogedor', pt: 'Segundo quarto aconchegante' },
  'apartment.artin-house-i.image.kitchenDetail': { en: 'Equipped kitchen details', es: 'Detalles de la cocina equipada', pt: 'Detalhes da cozinha equipada' },

  // Image descriptions for Artin House II
  'apartment.artin-house-ii.image.bedroom': { en: 'Cozy main bedroom', es: 'Dormitorio principal acogedor', pt: 'Quarto principal aconchegante' },
  'apartment.artin-house-ii.image.kitchen': { en: 'Fully equipped kitchen', es: 'Cocina completamente equipada', pt: 'Cozinha totalmente equipada' },
  'apartment.artin-house-ii.image.kitchenView': { en: 'Complete kitchen view', es: 'Vista completa de la cocina', pt: 'Vista completa da cozinha' },
  'apartment.artin-house-ii.image.kitchenDetail': { en: 'Modern kitchen details', es: 'Detalles de la cocina moderna', pt: 'Detalhes da cozinha moderna' },
  'apartment.artin-house-ii.image.bathroom': { en: 'Full bathroom with shower', es: 'Baño completo con ducha', pt: 'Banheiro completo com chuveiro' },
  'apartment.artin-house-ii.image.bathroomView': { en: 'Complete bathroom view', es: 'Vista completa del baño', pt: 'Vista completa do banheiro' },

  // Individual apartment pages
  'apartmentPage.backButton': { en: 'Back to Home', es: 'Volver al Inicio', pt: 'Voltar ao Início' },
  'apartmentPage.galleryTitle': { en: 'Gallery of', es: 'Galería de', pt: 'Galeria de' },
  'apartmentPage.amenitiesTitle': { en: 'Amenities and Services', es: 'Comodidades y Servicios', pt: 'Comodidades e Serviços' },
  'apartmentPage.contactTitle': { en: 'Need more information?', es: '¿Necesitas más información?', pt: 'Precisa de mais informações?' },
  'apartmentPage.contactButton': { en: 'Contact Us', es: 'Contáctanos', pt: 'Entre em Contato' },
  'apartmentPage.closeModal': { en: 'Close modal', es: 'Cerrar modal', pt: 'Fechar modal' },
  'apartmentPage.morePhotos': { en: 'more photos', es: 'fotos más', pt: 'fotos mais' },
  'apartmentPage.previousImage': { en: 'Previous image', es: 'Imagen anterior', pt: 'Imagem anterior' },
  'apartmentPage.nextImage': { en: 'Next image', es: 'Siguiente imagen', pt: 'Próxima imagem' },

  // Artin House I specific
  'artinHouseI.title': { en: 'Artin House I', es: 'Artin House I', pt: 'Artin House I' },
  'artinHouseI.description': { en: 'A spacious and bright apartment, perfect for families or small groups. Features a fully equipped kitchen, modern amenities and direct garden access.', es: 'Un apartamento amplio y luminoso, perfecto para familias o grupos pequeños. Cuenta con cocina totalmente equipada, comodidades modernas y acceso directo al jardín.', pt: 'Um apartamento espaçoso e luminoso, perfeito para famílias ou grupos pequenos. Possui cozinha totalmente equipada, comodidades modernas e acesso direto ao jardim.' },
  'artinHouseI.capacity': { en: 'Capacity:', es: 'Capacidad:', pt: 'Capacidade:' },
  'artinHouseI.guests': { en: '5 guests', es: '5 huéspedes', pt: '5 hóspedes' },
  'artinHouseI.rooms': { en: 'Rooms:', es: 'Habitaciones:', pt: 'Quartos:' },
  'artinHouseI.roomsDetail': { en: '2 Bedrooms, 1 Bathroom', es: '2 Dormitorios, 1 Baño', pt: '2 Quartos, 1 Banheiro' },

  // Artin House II specific  
  'artinHouseII.title': { en: 'Artin House II', es: 'Artin House II', pt: 'Artin House II' },
  'artinHouseII.description': { en: 'Modern apartment with all the amenities for a perfect stay. Ideal for couples or friends looking for comfort and elegance in the city center.', es: 'Moderno apartamento con todas las comodidades para una estancia perfecta. Ideal para parejas o amigos que buscan confort y elegancia en el centro de la ciudad.', pt: 'Apartamento moderno com todas as comodidades para uma estadia perfeita. Ideal para casais ou amigos que buscam conforto e elegância no centro da cidade.' },
  'artinHouseII.capacity': { en: 'Capacity:', es: 'Capacidad:', pt: 'Capacidade:' },
  'artinHouseII.guests': { en: '2 guests', es: '2 huéspedes', pt: '2 hóspedes' },
  'artinHouseII.rooms': { en: 'Rooms:', es: 'Habitaciones:', pt: 'Quartos:' },
  'artinHouseII.roomsDetail': { en: '1 Bedrooms, 1 Bathroom', es: '1 Dormitorio, 1 Baño', pt: '1 Quarto, 1 Banheiro' },

  // Mendoza Guide
  'mendozaGuide.hero.title': { en: '🍇 What to do in Mendoza', es: '🍇 Qué hacer en Mendoza', pt: '🍇 O que fazer em Mendoza' },
  'mendozaGuide.hero.subtitle': { en: 'Your complete guide to discover the best wines, gastronomy and adventures in the region', es: 'Tu guía completa para descubrir los mejores vinos, gastronomía y aventuras de la región', pt: 'Seu guia completo para descobrir os melhores vinhos, gastronomia e aventuras da região' },

  // Wines Section
  'mendozaGuide.wines.title': { en: '🍷 Winery Experiences', es: '🍷 Experiencias en Bodegas', pt: '🍷 Experiências em Vinícolas' },
  'mendozaGuide.wines.description': { en: 'Mendoza is world renowned for its exceptional wines. Discover the best wineries and wine experiences the region has to offer.', es: 'Mendoza es mundialmente reconocida por sus vinos excepcionales. Descubrí las mejores bodegas y experiencias enológicas que la región tiene para ofrecer.', pt: 'Mendoza é mundialmente reconhecida por seus vinhos excepcionais. Descubra as melhores vinícolas e experiências enológicas que a região tem a oferecer.' },
  
  // Wine table translations
  'mendozaGuide.wines.table.headers.activity': { en: '🍷 ACTIVITY', es: '🍷 ACTIVIDAD', pt: '🍷 ATIVIDADE' },
  'mendozaGuide.wines.table.headers.recommendation': { en: '⭐ RECOMMENDATION', es: '⭐ RECOMENDACIÓN', pt: '⭐ RECOMENDAÇÃO' },
  'mendozaGuide.wines.table.headers.notes': { en: '📍 NOTES', es: '📍 NOTAS', pt: '📍 NOTAS' },
  
  // Wine table rows - Tasting
  'mendozaGuide.wines.table.rows.tasting.activity': { en: 'Wine tasting', es: 'Cata de vinos', pt: 'Degustação de vinhos' },
  'mendozaGuide.wines.table.rows.tasting.recommendation': { en: 'Catena Zapata - Impressive architecture and exceptional wines', es: 'Catena Zapata - Arquitectura impresionante y vinos excepcionales', pt: 'Catena Zapata - Arquitetura impressionante e vinhos excepcionais' },
  'mendozaGuide.wines.table.rows.tasting.note': { en: 'Online reservations with special discounts', es: 'Reservas online con descuentos especiales', pt: 'Reservas online com descontos especiais' },
  
  // Wine table rows - Tour
  'mendozaGuide.wines.table.rows.tour.activity': { en: 'Tour with lunch', es: 'Tour con almuerzo', pt: 'Tour com almoço' },
  'mendozaGuide.wines.table.rows.tour.recommendation': { en: 'Gourmet experience at Ruca Malen - Panoramic views', es: 'Experiencia gourmet en Ruca Malen - Vistas panorámicas', pt: 'Experiência gourmet na Ruca Malen - Vistas panorâmicas' },
  'mendozaGuide.wines.table.rows.tour.note': { en: 'Includes complete pairing and transfer', es: 'Incluye maridaje completo y transfer', pt: 'Inclui harmonização completa e transfer' },
  
  // Wine table rows - Premium
  'mendozaGuide.wines.table.rows.premium.activity': { en: 'Premium experience', es: 'Experiencia premium', pt: 'Experiência premium' },
  'mendozaGuide.wines.table.rows.premium.recommendation': { en: 'Achaval Ferrer - Personalized attention and unique terroir', es: 'Achaval Ferrer - Atención personalizada y terroir único', pt: 'Achaval Ferrer - Atenção personalizada e terroir único' },
  'mendozaGuide.wines.table.rows.premium.note': { en: 'Ideal for demanding connoisseurs', es: 'Ideal para conocedores exigentes', pt: 'Ideal para conhecedores exigentes' },
  
  // Wine table rows - Bike
  'mendozaGuide.wines.table.rows.bike.activity': { en: 'Bike tour', es: 'Tour en bicicleta', pt: 'Tour de bicicleta' },
  'mendozaGuide.wines.table.rows.bike.recommendation': { en: 'Maipú tour - Adventure among vineyards', es: 'Recorrido por Maipú - Aventura entre viñedos', pt: 'Percurso por Maipú - Aventura entre vinhedos' },
  'mendozaGuide.wines.table.rows.bike.note': { en: 'Includes bike rental and tasting', es: 'Incluye alquiler de bicicletas y degustación', pt: 'Inclui aluguel de bicicletas e degustação' },
  'mendozaGuide.wines.header.activity': { en: 'ACTIVITY', es: 'ACTIVIDAD', pt: 'ATIVIDADE' },
  'mendozaGuide.wines.header.recommendation': { en: 'ARTIN HOUSE RECOMMENDATION', es: 'RECOMENDACIÓN DE ARTIN HOUSE', pt: 'RECOMENDAÇÃO ARTIN HOUSE' },
  'mendozaGuide.wines.header.note': { en: 'KEEP IN MIND', es: 'PARA TENER EN CUENTA', pt: 'LEMBRE-SE' },
  'mendozaGuide.wines.tasting.activity': { en: 'Tastings and Tours', es: 'Cata y Tours', pt: 'Degustações e Tours' },
  'mendozaGuide.wines.tasting.recommendation': { en: 'Visit historic wineries like Catena Zapata, Norton or Achaval Ferrer.', es: 'Visitá bodegas históricas como Catena Zapata, Norton o Achaval Ferrer.', pt: 'Visite vinícolas históricas como Catena Zapata, Norton ou Achaval Ferrer.' },
  'mendozaGuide.wines.tasting.note': { en: 'Essential to book! Premium wineries sell out days in advance.', es: '¡Imprescindible reservar! Las bodegas premium agotan sus cupos con días de anticipación.', pt: 'Essencial reservar! As vinícolas premium esgotam com dias de antecedência.' },
  'mendozaGuide.wines.gourmet.activity': { en: 'Gourmet Lunches', es: 'Almuerzos Gourmet', pt: 'Almoços Gourmet' },
  'mendozaGuide.wines.gourmet.recommendation': { en: 'Enjoy a pairing lunch with vineyard views. Check the menu at Bodega Séptima or El Enemigo (Chachingo).', es: 'Disfrutá de un almuerzo de pasos (maridaje) con vistas a los viñedos. Consultá el menú en Bodega Séptima o El Enemigo (Chachingo).', pt: 'Desfrute de um almoço harmonizado com vista para os vinhedos. Consulte o menu na Bodega Séptima ou El Enemigo (Chachingo).' },
  'mendozaGuide.wines.gourmet.note': { en: 'Photo opportunity: Upload an image of a Malbec glass with vineyards in the background.', es: 'Busca la Foto: Sube una imagen de una copa de Malbec con los viñedos de fondo.', pt: 'Oportunidade de foto: Tire uma foto de uma taça de Malbec com vinhedos ao fundo.' },
  'mendozaGuide.wines.tip.activity': { en: '🧭 Elizabeth\'s Tip', es: '🧭 Tip de Elizabeth', pt: '🧭 Dica da Elizabeth' },
  'mendozaGuide.wines.tip.recommendation': { en: 'Ask me about lesser-known family tours. Perfect for an intimate experience! I also recommend El Manzano Histórico where San Martín planned the crossing of the Andes.', es: 'Preguntame por tours menos conocidos y familiares. ¡Ideales para una experiencia íntima! También te recomiendo El Manzano Histórico donde San Martín planificó el cruce de los Andes.', pt: 'Me pergunte sobre tours familiares menos conhecidos. Perfeitos para uma experiência íntima! Também recomendo El Manzano Histórico onde San Martín planejou a travessia dos Andes.' },
  'mendozaGuide.wines.tip.note': { en: 'Secret routes and unique places', es: 'Rutas secretas y lugares únicos', pt: 'Rotas secretas e lugares únicos' },

  // Gastronomy Section
  'mendozaGuide.gastronomy.title': { en: '🍽️ Local Gastronomy', es: '🍽️ Gastronomía Local', pt: '🍽️ Gastronomia Local' },
  'mendozaGuide.gastronomy.description': { en: 'Mendoza\'s gastronomy combines tradition and innovation. From traditional barbecues to haute cuisine, every meal is a unique experience.', es: 'La gastronomía mendocina combina tradición e innovación. Desde asados tradicionales hasta alta cocina, cada comida es una experiencia única.', pt: 'A gastronomia mendocina combina tradição e inovação. Desde churrascos tradicionais até alta gastronomia, cada refeição é uma experiência única.' },
  'mendozaGuide.gastronomy.chacras.title': { en: '🍽️ Chacras de Coria', es: '🍽️ Chacras de Coria', pt: '🍽️ Chacras de Coria' },
  'mendozaGuide.gastronomy.chacras.description': { en: 'The most exclusive gastronomic district of Mendoza. Gourmet restaurants with vineyard views and world-class culinary offerings.', es: 'El distrito gastronómico más exclusivo de Mendoza. Restaurantes gourmet con vista a los viñedos y una propuesta culinaria de primer nivel mundial.', pt: 'O distrito gastronômico mais exclusivo de Mendoza. Restaurantes gourmet com vista para as vinhas e ofertas culinárias de classe mundial.' },
  'mendozaGuide.gastronomy.chacras.note': { en: 'Advice: Book in advance, especially in high season.', es: 'Consejo: Reservá con anticipación, especialmente en temporada alta.', pt: 'Conselho: Reserve com antecedência, especialmente na alta temporada.' },
  'mendozaGuide.gastronomy.lujan.title': { en: 'Local Experience in Luján', es: 'Experiencia Local en Luján', pt: 'Experiência Local em Luján' },
  'mendozaGuide.gastronomy.lujan.description': { en: 'Living like a local in Luján de Cuyo will allow you to discover authentic restaurants and traditional markets. Must-see: The weekend fair and family grills in the center.', es: 'Vivir como un local en Luján de Cuyo te permitirá descubrir restaurantes auténticos y mercados tradicionales. Imperdible: La feria del fin de semana y las parrillas familiares del centro.', pt: 'Viver como um local em Luján de Cuyo permitirá descobrir restaurantes autênticos e mercados tradicionais. Imperdível: A feira de fim de semana e as churrasqueiras familiares do centro.' },
  'mendozaGuide.gastronomy.lujan.note': { en: 'Discover more about Luján de Cuyo at: mendoza.tur.ar/lujan-de-cuyo', es: 'Descubrí más sobre Luján de Cuyo en: mendoza.tur.ar/lujan-de-cuyo', pt: 'Descubra mais sobre Luján de Cuyo em: mendoza.tur.ar/lujan-de-cuyo' },

  // Adventure Section
  'mendozaGuide.adventure.title': { en: '⛰️ Adventure and Nature', es: '⛰️ Aventura y Naturaleza', pt: '⛰️ Aventura e Natureza' },
  'mendozaGuide.adventure.description': { en: 'Mendoza landscapes offer endless possibilities for adventure lovers. From relaxing hot springs to extreme mountain sports.', es: 'Los paisajes mendocinos ofrecen infinitas posibilidades para los amantes de la aventura. Desde relajantes termas hasta deportes extremos en la montaña.', pt: 'As paisagens mendocinas oferecem infinitas possibilidades para os amantes da aventura. Desde termas relaxantes até esportes radicais na montanha.' },
  'mendozaGuide.adventure.potrerillos.title': { en: '🏔️ Potrerillos', es: '🏔️ Potrerillos', pt: '🏔️ Potrerillos' },
  'mendozaGuide.adventure.potrerillos.description': { en: 'Just 50km from Luján, Potrerillos is perfect for a day of adventure. Enjoy the lake, water sports, trekking and the best views of the foothills. Recommended: Lunch with a view of the dam.', es: 'A solo 50km de Luján, Potrerillos es perfecto para un día de aventura. Disfrutá del lago, deportes acuáticos, trekking y las mejores vistas de la precordillera. Recomendado: Almorzar con vista al dique.', pt: 'A apenas 50km de Luján, Potrerillos é perfeito para um dia de aventura. Desfrute do lago, esportes aquáticos, trekking e as melhores vistas da pré-cordilheira. Recomendado: Almoçar com vista para a represa.' },
  'mendozaGuide.adventure.potrerillos.note': { en: 'Ideal for: Kayaking, stand up paddle, fishing and hiking.', es: 'Ideal para: Kayak, stand up paddle, pesca y caminatas.', pt: 'Ideal para: Caiaque, stand up paddle, pesca e caminhadas.' },
  'mendozaGuide.adventure.cacheuta.title': { en: '♨️ Cacheuta Hot Springs', es: '♨️ Termas de Cacheuta', pt: '♨️ Termas de Cacheuta' },
  'mendozaGuide.adventure.cacheuta.description': { en: 'Cacheuta offers the perfect relaxation experience in natural hot springs. Combine relaxation in the hot springs with activities like zip-lining and rafting on the Mendoza River.', es: 'Cacheuta ofrece la experiencia perfecta de relajación en aguas termales naturales. Combiná el relax en las termas con actividades como tirolesa y rafting en el río Mendoza.', pt: 'Cacheuta oferece a experiência perfeita de relaxamento em águas termais naturais. Combine o relaxamento nas termas com atividades como tirolesa e rafting no rio Mendoza.' },
  'mendozaGuide.adventure.tunnel.title': { en: '🚇 Potrerillos-Cacheuta Tunnel', es: '🚇 Túnel Potrerillos-Cacheuta', pt: '🚇 Túnel Potrerillos-Cacheuta' },
  'mendozaGuide.adventure.tunnel.description': { en: 'The historic tunnel connecting Potrerillos with Cacheuta is a fascinating engineering work. This passage allows you to enjoy both destinations in the same day, combining water adventure with thermal relaxation.', es: 'El túnel histórico que conecta Potrerillos con Cacheuta es una obra de ingeniería fascinante. Este paso te permite disfrutar de ambos destinos en un mismo día, combinando aventura acuática con relajación termal.', pt: 'O túnel histórico que conecta Potrerillos com Cacheuta é uma obra de engenharia fascinante. Esta passagem permite desfrutar de ambos os destinos no mesmo dia, combinando aventura aquática com relaxamento termal.' },
  'mendozaGuide.adventure.tunnel.note': { en: 'Scenic route: The tunnel offers unique views of the Mendoza foothills.', es: 'Ruta escénica: El túnel ofrece vistas únicas de la precordillera mendocina.', pt: 'Rota cênica: O túnel oferece vistas únicas da pré-cordilheira mendocina.' },

  // More Places Section
  'mendozaGuide.morePlaces.title': { en: '🗺️ More Must-Visit Places', es: '🗺️ Más Lugares Imperdibles', pt: '🗺️ Mais Lugares Imperdíveis' },
  'mendozaGuide.morePlaces.description': { en: 'Discover other Mendoza treasures that will complement your experience in the region.', es: 'Descubrí otros tesoros mendocinos que complementarán tu experiencia en la región.', pt: 'Descubra outros tesouros mendocinos que complementarão sua experiência na região.' },

  // More Places - Individual Places
  'mendozaGuide.places.manzano.title': { en: '📜 El Manzano Histórico', es: '📜 El Manzano Histórico', pt: '📜 El Manzano Histórico' },
  'mendozaGuide.places.manzano.description': { en: 'Historic place where San Martín planned the crossing of the Andes. An emblematic site with a colonial estate and museum that tells the story of American independence.', es: 'Lugar histórico donde San Martín planificó el cruce de los Andes. Un sitio emblemático con una estancia colonial y museo que cuenta la historia de la independencia americana.', pt: 'Local histórico onde San Martín planejou a travessia dos Andes. Um sítio emblemático com uma estância colonial e museu que conta a história da independência americana.' },
  'mendozaGuide.places.teatro.title': { en: '🎭 Independence Theater', es: '🎭 Teatro Independencia', pt: '🎭 Teatro Independencia' },
  'mendozaGuide.places.teatro.description': { en: 'Beautiful historic theater in downtown Mendoza. Check the schedule to enjoy plays, concerts and tango shows.', es: 'Hermoso teatro histórico en el centro de Mendoza. Consultá la cartelera para disfrutar de obras, conciertos y espectáculos de tango.', pt: 'Belo teatro histórico no centro de Mendoza. Consulte a programação para desfrutar de peças, concertos e espetáculos de tango.' },
  'mendozaGuide.places.parque.title': { en: '🌳 San Martín Park', es: '🌳 Parque San Martín', pt: '🌳 Parque San Martín' },
  'mendozaGuide.places.parque.description': { en: 'One of the most beautiful urban parks in Argentina. Ideal for walks, visiting the Cerro de la Gloria and enjoying the artificial lakes.', es: 'Uno de los parques urbanos más bellos de Argentina. Ideal para caminatas, visitar el Cerro de la Gloria y disfrutar de los lagos artificiales.', pt: 'Um dos parques urbanos mais belos da Argentina. Ideal para caminhadas, visitar o Cerro de la Gloria e desfrutar dos lagos artificiais.' },
  
  // Distance and location texts
  'mendozaGuide.places.manzano.distance': { en: '📍 45 min from Luján', es: '📍 A 45 min de Luján', pt: '📍 A 45 min de Luján' },
  'mendozaGuide.places.teatro.location': { en: '📍 In Mendoza City', es: '📍 En Ciudad de Mendoza', pt: '📍 Na Cidade de Mendoza' },
  'mendozaGuide.places.parque.location': { en: '📍 In Mendoza City', es: '📍 En Ciudad de Mendoza', pt: '📍 Na Cidade de Mendoza' },
  
  // Link texts
  'mendozaGuide.adventure.cacheuta.linkText': { en: 'More info at termascacheuta.com', es: 'Más info en termascacheuta.com', pt: 'Mais info em termascacheuta.com' },
  'mendozaGuide.gastronomy.lujan.moreInfoText': { en: 'More info', es: 'Más info', pt: 'Mais info' },
  'mendozaGuide.places.aconcagua.title': { en: '🏔️ Aconcagua', es: '🏔️ Aconcagua', pt: '🏔️ Aconcagua' },
  'mendozaGuide.places.aconcagua.description': { en: 'The highest mountain in America. Although the complete trekking requires preparation, you can visit the Provincial Park and enjoy the views.', es: 'La montaña más alta de América. Aunque el trekking completo requiere preparación, podés visitar el Parque Provincial y disfrutar de las vistas.', pt: 'A montanha mais alta da América. Embora o trekking completo exija preparação, você pode visitar o Parque Provincial e desfrutar das vistas.' },
  'mendozaGuide.places.lasLenas.title': { en: '🎿 Las Leñas', es: '🎿 Las Leñas', pt: '🎿 Las Leñas' },
  'mendozaGuide.places.lasLenas.description': { en: 'World-famous ski resort (winter season). In summer, perfect for high mountain trekking and spectacular views.', es: 'Centro de esquí de fama mundial (temporada invernal). En verano, perfecto para trekking de alta montaña y vistas espectaculares.', pt: 'Centro de esqui de fama mundial (temporada de inverno). No verão, perfeito para trekking de alta montanha e vistas espetaculares.' },
  'mendozaGuide.places.villavicencio.title': { en: '🌿 Villavicencio Nature Reserve', es: '🌿 Reserva Natural Villavicencio', pt: '🌿 Reserva Natural Villavicencio' },
  'mendozaGuide.places.villavicencio.description': { en: 'Protected nature reserve with unique landscapes and famous mineral water. The access road offers spectacular views of the foothills.', es: 'Reserva natural protegida con paisajes únicos y la famosa agua mineral. El camino de acceso ofrece vistas espectaculares de la precordillera.', pt: 'Reserva natural protegida com paisagens únicas e a famosa água mineral. A estrada de acesso oferece vistas espetaculares da pré-cordilheira.' },
  'mendozaGuide.places.cristo.title': { en: '✝️ Las Cuevas and Christ the Redeemer', es: '✝️ Las Cuevas y Cristo Redentor', pt: '✝️ Las Cuevas e Cristo Redentor' },
  'mendozaGuide.places.cristo.description': { en: 'Las Cuevas, the last town before crossing to Chile, invites you to experience the height of the Andes. Surrounded by imposing landscapes, from here you access the majestic Christ the Redeemer, at more than 3,800 m, a symbol of union and peace between Argentina and Chile.', es: 'Las Cuevas, el último pueblo antes de cruzar a Chile, te invita a vivir la altura de los Andes. Rodeado de imponentes paisajes, desde aquí se accede al majestuoso Cristo Redentor, a más de 3.800 m, símbolo de unión y paz entre Argentina y Chile.', pt: 'Las Cuevas, a última cidade antes de cruzar para o Chile, convida você a viver a altitude dos Andes. Cercado por paisagens imponentes, daqui se acessa o majestoso Cristo Redentor, a mais de 3.800 m, símbolo de união e paz entre Argentina e Chile.' },
  'mendozaGuide.places.puente.title': { en: '🌉 Puente del Inca', es: '🌉 Puente del Inca', pt: '🌉 Puente del Inca' },
  'mendozaGuide.places.puente.description': { en: 'Natural wonder that dazzles with its vibrant mineral tones and ancestral history. Part of the Qhapaq Ñan, World Heritage Site, it invites you to discover its unique formations, the ruins of ancient thermal baths and a chapel that keeps the spirit of the mountain range.', es: 'Maravilla natural que deslumbra con sus vibrantes tonos minerales y su historia ancestral. Parte del Qhapaq Ñan, Patrimonio de la Humanidad, invita a descubrir sus formaciones únicas, las ruinas de antiguos baños termales y una capilla que guarda el espíritu de la cordillera.', pt: 'Maravilha natural que deslumbra com seus tons minerais vibrantes e sua história ancestral. Parte do Qhapaq Ñan, Patrimônio da Humanidade, convida a descobrir suas formações únicas, as ruínas de antigos banhos termais e uma capela que guarda o espírito da cordilheira.' },
  'mendozaGuide.places.minas.title': { en: '⛏️ Jesuit Mines of Paramillos', es: '⛏️ Minas Jesuitas de Paramillos', pt: '⛏️ Minas Jesuítas de Paramillos' },
  'mendozaGuide.places.minas.description': { en: 'Between mountains and legends, the Ruins of the Jesuit Mines of Paramillos reveal the oldest history of Argentine mining. At 2,800 masl, this mysterious site combines heritage, faith and mystery, where the echoes of those who searched for gold among the Andes still seem to resonate.', es: 'Entre montañas y leyendas, las Ruinas de las Minas Jesuitas de Paramillos revelan la historia más antigua de la minería argentina. A 2.800 msnm, este misterioso sitio combina patrimonio, fe y misterio, donde aún parecen resonar los ecos de quienes buscaron oro entre los Andes.', pt: 'Entre montanhas e lendas, as Ruínas das Minas Jesuítas de Paramillos revelam a história mais antiga da mineração argentina. A 2.800 m de altitude, este sítio misterioso combina patrimônio, fé e mistério, onde ainda parecem ressoar os ecos daqueles que procuravam ouro entre os Andes.' },

  // Interactive Map Section
  'mendozaGuide.map.title': { en: '🗺️ Interactive Map', es: '🗺️ Mapa Interactivo', pt: '🗺️ Mapa Interativo' },
  'mendozaGuide.map.advice': { en: 'Click on the locations to discover more', es: 'Hace clic en las ubicaciones para descubrir más', pt: 'Clique nos locais para descobrir mais' },
  
  // More Info Button
  'mendozaGuide.moreInfo.button': { en: 'More Tourist Information', es: 'Más Información Turística', pt: 'Mais Informação Turística' },
  
  // Places Card General Texts
  'mendozaGuide.places.more.info': { en: 'More info', es: 'Más info', pt: 'Mais info' },
  'mendozaGuide.places.distance.from.lujan': { en: 'from Luján', es: 'de Luján', pt: 'de Luján' },
  'mendozaGuide.places.in.mendoza.city': { en: 'In Mendoza City', es: 'En Ciudad de Mendoza', pt: 'Na Cidade de Mendoza' },
  
  // More Places - Individual Places Translations
  // El Manzano Histórico
  'mendozaGuide.morePlaces.manzano.title': { en: '📜 El Manzano Histórico', es: '📜 El Manzano Histórico', pt: '📜 El Manzano Histórico' },
  'mendozaGuide.morePlaces.manzano.description': { en: 'Historic place where San Martín planned the crossing of the Andes. An emblematic site with a colonial estate and museum that tells the story of American independence.', es: 'Lugar histórico donde San Martín planificó el cruce de los Andes. Un sitio emblemático con una estancia colonial y museo que cuenta la historia de la independencia americana.', pt: 'Local histórico onde San Martín planejou a travessia dos Andes. Um sítio emblemático com uma estância colonial e museu que conta a história da independência americana.' },
  'mendozaGuide.morePlaces.manzano.distance': { en: '📍 45 min from Luján', es: '📍 A 45 min de Luján', pt: '📍 A 45 min de Luján' },

  // Teatro Independencia
  'mendozaGuide.morePlaces.teatro.title': { en: '🎭 Independence Theater', es: '🎭 Teatro Independencia', pt: '🎭 Teatro Independência' },
  'mendozaGuide.morePlaces.teatro.description': { en: 'Beautiful historic theater in downtown Mendoza. Check the schedule to enjoy plays, concerts and tango shows.', es: 'Hermoso teatro histórico en el centro de Mendoza. Consultá la cartelera para disfrutar de obras, conciertos y espectáculos de tango.', pt: 'Belo teatro histórico no centro de Mendoza. Consulte a programação para desfrutar de peças, concertos e espetáculos de tango.' },
  'mendozaGuide.morePlaces.teatro.distance': { en: '📍 In Mendoza City', es: '📍 En Ciudad de Mendoza', pt: '📍 Na Cidade de Mendoza' },

  // Parque San Martín
  'mendozaGuide.morePlaces.parque.title': { en: '🌳 San Martín Park', es: '🌳 Parque San Martín', pt: '🌳 Parque San Martín' },
  'mendozaGuide.morePlaces.parque.description': { en: 'One of the most beautiful urban parks in Argentina. Ideal for walks, visiting the Cerro de la Gloria and enjoying the artificial lakes.', es: 'Uno de los parques urbanos más bellos de Argentina. Ideal para caminatas, visitar el Cerro de la Gloria y disfrutar de los lagos artificiales.', pt: 'Um dos parques urbanos mais belos da Argentina. Ideal para caminhadas, visitar o Cerro de la Gloria e desfrutar dos lagos artificiais.' },
  'mendozaGuide.morePlaces.parque.distance': { en: '📍 In Mendoza City', es: '📍 En Ciudad de Mendoza', pt: '📍 Na Cidade de Mendoza' },

  // Aconcagua
  'mendozaGuide.morePlaces.aconcagua.title': { en: '🏔️ Aconcagua', es: '🏔️ Aconcagua', pt: '🏔️ Aconcagua' },
  'mendozaGuide.morePlaces.aconcagua.description': { en: 'The highest mountain in America. Although the complete trekking requires preparation, you can visit the Provincial Park and enjoy the views.', es: 'La montaña más alta de América. Aunque el trekking completo requiere preparación, podés visitar el Parque Provincial y disfrutar de las vistas.', pt: 'A montanha mais alta da América. Embora o trekking completo exija preparação, você pode visitar o Parque Provincial e desfrutar das vistas.' },
  'mendozaGuide.morePlaces.aconcagua.distance': { en: '📍 2.5 hours from Luján', es: '📍 A 2.5 horas de Luján', pt: '📍 A 2.5 horas de Luján' },

  // Las Leñas
  'mendozaGuide.morePlaces.lasLenas.title': { en: '🎿 Las Leñas', es: '🎿 Las Leñas', pt: '🎿 Las Leñas' },
  'mendozaGuide.morePlaces.lasLenas.description': { en: 'World-famous ski resort (winter season). In summer, perfect for high mountain trekking and spectacular views.', es: 'Centro de esquí de fama mundial (temporada invernal). En verano, perfecto para trekking de alta montaña y vistas espectaculares.', pt: 'Centro de esqui de fama mundial (temporada de inverno). No verão, perfeito para trekking de alta montanha e vistas espetaculares.' },
  'mendozaGuide.morePlaces.lasLenas.distance': { en: '📍 4 hours from Luján', es: '📍 A 4 horas de Luján', pt: '📍 A 4 horas de Luján' },

  // Reserva Natural Villavicencio
  'mendozaGuide.morePlaces.villavicencio.title': { en: '🌿 Villavicencio Nature Reserve', es: '🌿 Reserva Natural Villavicencio', pt: '🌿 Reserva Natural Villavicencio' },
  'mendozaGuide.morePlaces.villavicencio.description': { en: 'Protected nature reserve with unique landscapes and famous mineral water. The access road offers spectacular views of the foothills.', es: 'Reserva natural protegida con paisajes únicos y la famosa agua mineral. El camino de acceso ofrece vistas espectaculares de la precordillera.', pt: 'Reserva natural protegida com paisagens únicas e a famosa água mineral. A estrada de acesso oferece vistas espetaculares da pré-cordilheira.' },
  'mendozaGuide.morePlaces.villavicencio.distance': { en: '📍 1.5 hours from Luján', es: '📍 A 1.5 horas de Luján', pt: '📍 A 1.5 horas de Luján' },

  // Las Cuevas y Cristo Redentor
  'mendozaGuide.morePlaces.cristoRedentor.title': { en: '✝️ Las Cuevas and Christ the Redeemer', es: '✝️ Las Cuevas y Cristo Redentor', pt: '✝️ Las Cuevas e Cristo Redentor' },
  'mendozaGuide.morePlaces.cristoRedentor.description': { en: 'Las Cuevas, the last town before crossing to Chile, invites you to experience the height of the Andes. Surrounded by imposing landscapes, from here you access the majestic Christ the Redeemer, at more than 3,800 m, a symbol of union and peace between Argentina and Chile.', es: 'Las Cuevas, el último pueblo antes de cruzar a Chile, te invita a vivir la altura de los Andes. Rodeado de imponentes paisajes, desde aquí se accede al majestuoso Cristo Redentor, a más de 3.800 m, símbolo de unión y paz entre Argentina y Chile. Un destino ideal para sentir la cordillera en su máxima expresión.', pt: 'Las Cuevas, a última cidade antes de cruzar para o Chile, convida você a viver a altitude dos Andes. Cercado por paisagens imponentes, daqui se acessa o majestoso Cristo Redentor, a mais de 3.800 m, símbolo de união e paz entre Argentina e Chile.' },
  'mendozaGuide.morePlaces.cristoRedentor.distance': { en: '📍 2.40 hours from Luján', es: '📍 A 2.40 horas de Luján', pt: '📍 A 2.40 horas de Luján' },

  // Puente del Inca
  'mendozaGuide.morePlaces.puenteDelInca.title': { en: '🌉 Puente del Inca', es: '🌉 Puente del Inca', pt: '🌉 Puente del Inca' },
  'mendozaGuide.morePlaces.puenteDelInca.description': { en: 'Natural wonder that dazzles with its vibrant mineral tones and ancestral history. Part of the Qhapaq Ñan, World Heritage Site, it invites you to discover its unique formations, the ruins of ancient thermal baths and a chapel that keeps the spirit of the mountain range.', es: 'Maravilla natural que deslumbra con sus vibrantes tonos minerales y su historia ancestral. Parte del Qhapaq Ñan, Patrimonio de la Humanidad, invita a descubrir sus formaciones únicas, las ruinas de antiguos baños termales y una capilla que guarda el espíritu de la cordillera.', pt: 'Maravilha natural que deslumbra com seus tons minerais vibrantes e sua história ancestral. Parte do Qhapaq Ñan, Patrimônio da Humanidade, convida a descobrir suas formações únicas, as ruínas de antigos banhos termais e uma capela que guarda o espírito da cordilheira.' },
  'mendozaGuide.morePlaces.puenteDelInca.distance': { en: '📍 2.15 hours from Luján', es: '📍 A 2.15 horas de Luján', pt: '📍 A 2.15 horas de Luján' },

  // Minas Jesuitas de Paramillos
  'mendozaGuide.morePlaces.minasParamillos.title': { en: '⛏️ Jesuit Mines of Paramillos', es: '⛏️ Minas Jesuitas de Paramillos', pt: '⛏️ Minas Jesuítas de Paramillos' },
  'mendozaGuide.morePlaces.minasParamillos.description': { en: 'Between mountains and legends, the Ruins of the Jesuit Mines of Paramillos reveal the oldest history of Argentine mining. At 2,800 masl, this mysterious site combines heritage, faith and mystery, where the echoes of those who searched for gold among the Andes still seem to resonate.', es: 'Entre montañas y leyendas, las Ruinas de las Minas Jesuitas de Paramillos revelan la historia más antigua de la minería argentina. A 2.800 msnm, este misterioso sitio combina patrimonio, fe y misterio, donde aún parecen resonar los ecos de quienes buscaron oro entre los Andes.', pt: 'Entre montanhas e lendas, as Ruínas das Minas Jesuítas de Paramillos revelam a história mais antiga da mineração argentina. A 2.800 m de altitude, este sítio misterioso combina patrimônio, fé e mistério, onde ainda parecem ressoar os ecos daqueles que procuravam ouro entre os Andes.' },
  'mendozaGuide.morePlaces.minasParamillos.distance': { en: '📍 1.5 hours from Luján', es: '📍 A 1.5 horas de Luján', pt: '📍 A 1.5 horas de Luján' },

  // Contact Section
  'mendozaGuide.contact.title': { en: 'Ready for your Mendoza adventure?', es: '¿Listo para tu aventura mendocina?', pt: 'Pronto para sua aventura mendocina?' },
  'mendozaGuide.contact.description': { en: 'Contact us for more personalized information', es: 'Contáctanos para más información personalizada', pt: 'Entre em contato conosco para informações mais personalizadas' },
  'mendozaGuide.contact.whatsapp': { en: 'WhatsApp', es: 'WhatsApp', pt: 'WhatsApp' },
  'mendozaGuide.contact.email': { en: 'Contact', es: 'Contacto', pt: 'Contato' },

};

@Injectable({ providedIn: 'root' })
export class TranslationService {
  language = signal<'en' | 'es' | 'pt'>('es');

  private translationsData = signal<Translations>(translations);

  translate(key: string): Signal<string> {
    return computed(() => {
      const lang = this.language();
      const allTranslations = this.translationsData();
      const translation = allTranslations[key];
      if (!translation) return key;
      
      // Si es portugués y no existe la traducción, usar español como fallback
      if (lang === 'pt' && !translation.pt) {
        return translation.es ?? translation.en ?? key;
      }
      
      return translation[lang] ?? key;
    });
  }

  setLanguage(lang: 'en' | 'es' | 'pt') {
    this.language.set(lang);
  }
}
