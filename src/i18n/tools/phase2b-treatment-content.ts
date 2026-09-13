import type { ToolPageSection, ToolContent } from './_types';

export interface Phase2BTreatmentContent {
  contentSections: ToolPageSection[];
  examples?: string[];
  notes?: string[];
}

export type Phase2BExpansionLocale = 'es' | 'fr';

const zh = (contentSections: ToolPageSection[], examples: string[], notes: string[]): Phase2BTreatmentContent => ({ contentSections, examples, notes });
const en = (contentSections: ToolPageSection[], examples: string[], notes: string[]): Phase2BTreatmentContent => ({ contentSections, examples, notes });

export const phase2bToolContent: Record<'zh' | 'en', Record<string, Phase2BTreatmentContent>> = {
  zh: {
    'bar-chart-maker': zh([
      { heading: '長條圖的資料先怎麼整理', paragraphs: ['每一列代表一個類別，每個類別只放一個要比較的數值。例如要比較四季訂單，可輸入「第一季、120」「第二季、185」「第三季、160」「第四季、210」，再檢查標籤順序是否符合報告的閱讀順序。', '數值應使用可比較的同一單位；不要把「件數」和「收入」放在同一張圖。若資料包含負數，先確認圖表的零線與標籤仍能讓讀者辨識方向。'] },
      { heading: '輸出圖表如何判讀與檢查', paragraphs: ['產生後先看最高與最低柱是否對應原始輸入，再檢查刻度是否讓差距被誇大。匯出的 PNG 適合放進簡報或講義，但圖片不會保留可重新計算的原始資料。', '如果只是想比較數值，請保留輸入表；若要交付正式報告，另行標示資料期間、單位與來源。這個瀏覽器工具負責繪圖與匯出，不會替你判斷因果或統計顯著性。'] },
    ], ['用四季訂單數繪製一張年度比較圖。', '把四個班級的平均分數做成教學用長條圖。'], ['標籤相同時讀者可能無法分辨類別，匯出前請逐項檢查。', 'PNG 是視覺輸出，不是可供試算表繼續編輯的資料檔。']),
    base64: zh([
      { heading: 'Base64 輸入與用途判斷', paragraphs: ['若要測試文字，可輸入 `Hello, FunnyTools!`；若要處理檔案，選擇檔案後讓工具產生對應的 data URL。文字 Base64 適合在需要 ASCII 字串傳遞時使用，並不等於壓縮或加密。', '檔案轉成 Base64 後會膨脹，常見估算約比原始位元組多三分之一。把它放入 JSON、HTML 或 API 前，先確認接收端需要的是完整 data URL，還是只需要逗號後的編碼內容。'] },
      { heading: '解碼結果與安全邊界', paragraphs: ['解碼時先確認來源標示的媒體類型，例如 `data:text/plain;base64,...` 與 `data:image/png;base64,...` 的用途不同。輸出若是文字，請比對換行與 Unicode 字元；若是檔案，請下載後再用對應程式開啟。', 'Base64 沒有提供機密性或完整性驗證。不要把密碼、存取權杖或私人檔案貼到公共電腦；即使計算在本機完成，剪貼簿、瀏覽器歷史與裝置權限仍可能暴露內容。'] },
    ], ['把 `Hello` 編碼後再解碼，確認結果回到原字串。', '檢查一個 PNG data URL 的媒體類型與檔案輸出。'], ['Base64 字串變長是正常現象，不能拿它當壓縮率。', '錯誤的 padding 或被截斷的字串會造成解碼失敗。']),
    'cronbach-alpha-calculator': zh([
      { heading: '先準備可重現的量表矩陣', paragraphs: ['每一列放一位受試者，每一欄放同一量表的一個題目。例如五位受試者回答四題，就應有 5 × 4 個數值；先移除姓名與欄名，並在計算前完成反向題的正確重編碼。', '若使用 1 到 5 分量尺，先確認所有題目的方向一致。缺值、不同欄數或混入文字會讓資料不適合直接計算；請保留原始檔，另存一份匿名化的分析副本。'] },
      { heading: 'α 的輸出代表什麼', paragraphs: ['工具會顯示受試者數 N、題目數 k、總分平均、總分標準差與 α。這些欄位可用來核對輸入是否完整；例如 N 意外少一位，應先查資料格式，不要直接把結果寫入報告。', 'α 反映題目在這份樣本中的內部一致性，不證明單一構面、效度或跨時間穩定性。題目很多或內容重複可能推高 α；正式研究仍需說明缺值處理、量表版本與其他信度或效度證據。'] },
    ], ['用五位受試者、四個已完成反向計分的題目做算術核對。', '把工具輸出的 N、k 與 α 和統計軟體摘要逐項比對。'], ['總分沒有變異時 α 無法提供有意義的估計。', '不要把 .70 當成所有量表與用途都適用的通用門檻。']),
    'seating-chart': zh([
      { heading: '製作座位表前準備名單', paragraphs: ['先把每位學生放在獨立一行，移除學號、電話等不需要的識別資訊。例如 24 位學生要排成 4 列 6 欄，就先確認人數與座位數一致，再選擇是否打散順序。', '若有不能相鄰、無障礙位置或分組要求，先在紙上標記限制；這個工具能產生座位排列，但不會理解學生關係、視力需求或教師的班級管理規則。'] },
      { heading: '結果如何核對與使用', paragraphs: ['產生後逐格確認每個名字只出現一次，並檢查列數、欄數與教室前方方向。需要重排時可重新產生，但請把採用的版本另存或列印，避免重新整理頁面後失去正在使用的安排。', '隨機排列只能提供一個起始方案，不代表公平或最佳方案。對有特殊需求的班級，人工套用已知限制並再次核對人數，比直接接受第一次結果更安全。'] },
    ], ['用 24 人班級產生 4 × 6 的初版座位表。', '把隨機結果作為小組活動前的分組起點，再套用教室限制。'], ['姓名屬於個人資料，示範時可改用代號。', '重新產生結果會改變排列，正式使用前要固定並保存版本。']),
    'countdown-timer': zh([
      { heading: '倒數時間與任務要對得上', paragraphs: ['設定時間前先決定任務的結束條件。例如 25 分鐘專注工作可設定 00:25:00，並把標籤寫成「整理研究筆記」；標籤能幫助你在多個分頁或螢幕旁辨認目前倒數用途。', '短倒數適合可明確結束的活動，長倒數則要先確認裝置不會進入省電或瀏覽器分頁被暫停。若任務需要中途休息，請把工作與休息拆成兩次倒數，而不是把提醒責任交給單一長計時器。'] },
      { heading: '到點後的行為與限制', paragraphs: ['開始後請確認畫面上的剩餘時間正在減少，暫停或重設前先記錄目前進度。倒數結束時的提示是本頁互動的一部分，不能取代手機、作業系統或日曆的背景通知。', '若你關閉分頁、切換到受限制的背景環境，或裝置睡眠，實際提醒可能不符合預期。需要長時間或關鍵提醒時，請使用專門的鬧鐘並把本工具當作可見的工作計時器。'] },
    ], ['用 25 分鐘倒數完成一段不被打斷的筆記整理。', '把 5 分鐘休息另設為一個倒數，而不是修改已開始的工作計時。'], ['計時器不會替你保存任務內容或在關閉頁面後恢復狀態。', '完成時間的準確性會受裝置與瀏覽器背景節流影響。']),
  },
  en: {
    'cad-2d': en([
      { heading: 'Set up a 2D drawing that can be checked', paragraphs: ['Start with a small coordinate plan: for example, draw a 120 by 80 rectangle, add a 30-unit circle near its center, and keep the origin and units visible in your notes. A simple first shape makes it easier to spot a mistaken scale or an accidental drag.','Use the same unit for every coordinate and dimension. The board is useful for quick layouts, teaching geometry, and exporting a visual draft; it is not a substitute for a surveyed coordinate system or a full CAD project with layers, constraints, and revision history.'] },
      { heading: 'Read the drawing and export safely', paragraphs: ['Before exporting, inspect the object list or canvas visually and verify that the intended lines, circles, and labels are present. A PNG is convenient for a slide, while an SVG keeps vector geometry for many downstream uses; choose the format according to the recipient.','An exported image does not prove that dimensions are to scale unless the receiving workflow preserves the drawing units. Keep the coordinate notes alongside the export, and recheck any measurement used for fabrication, compliance, or a client handoff in the required CAD system.'] },
    ], ['Draft a 120 × 80 rectangle for a worksheet diagram.', 'Draw a simple room outline before moving the final dimensions into CAD software.'], ['A visual export is not a manufacturing or survey record.', 'Keep a copy of the coordinate plan because an image alone is hard to edit.']),
    'class-rank-percentile-calculator': en([
      { heading: 'Enter rank data with a defined cohort', paragraphs: ['Enter the student rank and the total number of students from the same ordered list. For example, rank 7 in a cohort of 30 is a different input from rank 7 in a cohort of 300; record the cohort definition before calculating.','Decide how ties were handled in the source list. If the ranking includes absent students, exclusions, or a special examination group, use the same denominator that the official list uses rather than silently replacing it with the visible class size.'] },
      { heading: 'Interpret the percentile without overclaiming', paragraphs: ['The result expresses a relative position within the supplied cohort. It is useful for checking a spreadsheet or explaining an approximate standing, but it does not convert a rank into a grade, admission probability, or measure of learning.','Different percentile conventions can assign different values to the same rank, especially at the top, bottom, or around ties. Compare the formula and tie rule with the school or testing body before publishing the number, and keep the original rank list for auditability.'] },
    ], ['Check a rank of 7 among 30 students against a hand calculation.', 'Compare the displayed percentile with a spreadsheet using the same tie convention.'], ['A percentile is relative to the named cohort and date.', 'Do not use the output as an official transcript or admissions decision by itself.']),
    'compound-interest': en([
      { heading: 'Define the compounding inputs', paragraphs: ['For a reproducible example, enter a principal of 1000, an annual rate of 5%, annual compounding, and a term of 3 years. Write down whether the rate is nominal, whether deposits are added, and whether the term is measured in complete years.','The compounding frequency changes the result: monthly and annual compounding are not interchangeable. Use the same currency and rate period throughout, and do not enter a percentage as 0.05 if the field expects 5.'] },
      { heading: 'Read the balance and its limits', paragraphs: ['Compare the displayed final balance with the starting principal and the interest portion. If regular deposits or withdrawals are part of the real plan, a one-time-principal calculation is only a baseline and should not be presented as the complete forecast.','The result is arithmetic, not a promise of return. Taxes, fees, changing rates, inflation, contribution timing, and early withdrawals can materially alter the outcome; verify those assumptions with the relevant account or official terms before making a financial decision.'] },
    ], ['Check 1000 at 5% for 3 years with annual compounding.', 'Run the same principal with monthly compounding to see why frequency must be reported.'], ['The calculator does not model taxes, fees, inflation, or uncertain future rates.', 'Keep the rate period and currency next to any copied result.']),
    'cronbach-alpha-calculator': en([
      { heading: 'Prepare an analyzable response matrix', paragraphs: ['Put one respondent on each row and one item on each column. A five-person, four-item practice matrix should contain exactly 20 numeric cells after names and headers are removed; reverse-score keyed items before pasting.','Check that all columns belong to the same intended scale and use a consistent direction. Missing cells, irregular row lengths, and text such as NA are not silently repaired because each choice changes N, item variances, and the total-score variance.'] },
      { heading: 'Use alpha as one piece of evidence', paragraphs: ['The output reports N, k, the mean and standard deviation of total scores, and alpha. These values make a useful input check: an unexpected N or a zero total-score standard deviation is a reason to stop and inspect the matrix.','Alpha describes internal consistency for this sample and scale version. It does not establish unidimensionality, validity, measurement invariance, or test-retest stability; report the scoring rule, missing-data handling, sample, and complementary evidence when the result matters.'] },
    ], ['Verify a five-by-four practice matrix before using a statistical package.', 'Compare N, k, and alpha with a second implementation using the same reverse-scoring rule.'], ['A high alpha can reflect many redundant items.', 'Do not treat a universal .70 cutoff as a complete reliability decision.']),
    'percentage-calculator': en([
      { heading: 'Choose the percentage question first', paragraphs: ['For 18% of 250, use the part-of-quantity calculation and expect 45. For 36 out of 144, use the share-of-total calculation and expect 25%. These are different questions even though both contain two numbers.','For a change from 80 to 100, use the relative-change calculation and expect a 25% increase. Write the base, unit, and time period beside the values; a correct formula cannot fix a mismatched numerator and denominator.'] },
      { heading: 'Separate relative change from percentage points', paragraphs: ['A rate moving from 20% to 25% changes by 5 percentage points, while its relative increase is 25%. Use the output that matches the question and state the base so readers do not confuse the two descriptions.','A zero total or zero starting value makes the relevant division undefined. Discounts, tax, margin, and successive changes may use different bases, so calculate each step with its stated base and apply the required rounding rule at the correct stage.'] },
    ], ['Calculate 18% of 250 and label the result as a part, not a final price.', 'Compare a change from 80 to 100 with a change from 100 to 80 to see the base effect.'], ['The tool does not decide whether a business or legal rounding rule applies.', 'A percentage above 100% can be valid; interpret it using the underlying quantity.']),
  },
};

export const phase2bExpansionContent: Record<Phase2BExpansionLocale, Record<string, Phase2BTreatmentContent>> = {
  es: {
    'dice-roller': {
      contentSections: [
        { heading: 'Preparar una tirada reproducible', paragraphs: ['Antes de pulsar, decide cuántos dados y cuántas caras necesita la actividad. Por ejemplo, para una práctica de probabilidad puedes lanzar tres dados de seis caras y anotar cada resultado, no solo la suma final.', 'Una tirada sirve para generar un resultado aleatorio, no para demostrar que una serie corta es perfectamente uniforme. Si el resultado se usa en clase, define de antemano qué ocurre con un empate, un valor repetido o una tirada que debe repetirse.'] },
        { heading: 'Leer la salida y sus límites', paragraphs: ['Comprueba que la salida muestra el número de dados y el rango esperado; con tres dados de seis caras, la suma debe quedar entre 3 y 18. Conserva el resultado junto con la actividad o la regla que lo utiliza.', 'El navegador genera una nueva tirada cuando se solicita, pero la página no sustituye un sorteo auditado con semilla, registro externo o autoridad independiente. Para decisiones sensibles, documenta participantes, momento y procedimiento.'] },
      ],
      examples: ['Generar tres resultados de seis caras para una actividad de probabilidad.', 'Usar una tirada como desempate previamente acordado en un juego de aula.'],
      notes: ['La suma por sí sola oculta la combinación de dados; anota los valores individuales cuando importen.', 'Una tirada casual no es una prueba de aleatoriedad a largo plazo.'],
    },
    'cronbach-alpha-calculator': {
      contentSections: [
        { heading: 'Preparar una matriz de respuestas', paragraphs: ['Coloca una persona por fila y un ítem por columna. Una matriz de práctica de cinco personas y cuatro ítems debe tener 20 celdas numéricas después de quitar nombres y encabezados; recodifica los ítems invertidos antes de pegarla.', 'Confirma que todos los ítems pertenecen a la misma escala y apuntan en la misma dirección. La calculadora no imputa faltantes ni completa filas irregulares porque esas decisiones cambian el tamaño de muestra y la varianza total.'] },
        { heading: 'Interpretar alfa con contexto', paragraphs: ['Revisa N, k, la media y la desviación de la puntuación total junto con α. Si N no coincide con tus participantes o la puntuación total no varía, detén el informe y revisa los datos de entrada.', 'Alfa resume la consistencia interna de esta muestra y versión de la escala; no demuestra validez, unidimensionalidad ni estabilidad temporal. Documenta idioma, población, recodificación y tratamiento de faltantes en cualquier informe.'] },
      ],
      examples: ['Comprobar una matriz 5 × 4 antes de ejecutar el análisis en un programa estadístico.', 'Comparar N, k y α con una segunda implementación que use la misma recodificación.'],
      notes: ['Un alfa alto puede reflejar ítems redundantes.', 'No uses .70 como umbral universal sin justificar la finalidad y el modelo de medida.'],
    },
    'standard-deviation': {
      contentSections: [
        { heading: 'Elegir población o muestra antes de pegar datos', paragraphs: ['Decide qué conjunto describen los números. Las notas de los ocho alumnos de una clase son una población si solo hablas de esa clase; son una muestra si pretendes estimar un grupo más amplio.', 'Prueba con `12 14 15 15 16 18 19 20` y anota si el separador, la unidad y el número de observaciones coinciden con la fuente. Retira unidades y encabezados para que el recuento reconocido sea verificable.'] },
        { heading: 'Leer la dispersión sin inventar una causa', paragraphs: ['La media, mediana, mínimo, máximo, rango y desviación estándar responden a preguntas distintas. Una desviación mayor indica más separación alrededor de la media, pero no prueba normalidad, calidad del proceso o una causa concreta.', 'La variante muestral usa n−1 y la poblacional usa n. Conserva la elección, la unidad y el redondeo junto al resultado; para publicar o decidir, revisa también valores extremos y la forma de la distribución.'] },
      ],
      examples: ['Describir las notas completas de una clase como población.', 'Estimar la variabilidad de mediciones tomadas de un proceso más amplio usando n−1.'],
      notes: ['El punto decimal evita confundir la coma con el separador de observaciones.', 'Una desviación estándar exacta no corrige un muestreo sesgado.'],
    },
    'business-days': {
      contentSections: [
        { heading: 'Definir el intervalo y el calendario', paragraphs: ['Introduce la fecha inicial y final según la regla del encargo. Por ejemplo, de lunes 5 de enero de 2026 a viernes 9 de enero de 2026 hay cinco días laborables si solo se excluyen sábados y domingos.', 'Confirma si el contrato cuenta el día inicial, el día final o ambos, y si existe una lista de festivos aplicable. Una fecha escrita con la zona horaria o el formato equivocado puede mover el intervalo un día.'] },
        { heading: 'Comprobar el número antes de usarlo', paragraphs: ['Revisa las fechas interpretadas y el total mostrado, y comprueba manualmente una semana corta. Si el intervalo cruza un fin de semana, enumera los días incluidos para explicar por qué el resultado no coincide con una resta simple de fechas.', 'Este cálculo no conoce automáticamente los festivos de tu país o empresa salvo que los introduzcas en el flujo correspondiente. Para nóminas, plazos legales o contratos, valida el calendario oficial y conserva la convención usada.'] },
      ],
      examples: ['Calcular una semana laboral de lunes a viernes sin festivos añadidos.', 'Comprobar un plazo que cruza un fin de semana antes de comunicar una fecha límite.'],
      notes: ['Días naturales y días laborables no son intercambiables.', 'Los festivos locales requieren una fuente o lista explícita.'],
    },
    'mortgage-payment': {
      contentSections: [
        { heading: 'Separar los supuestos del préstamo', paragraphs: ['Para una comprobación aritmética puedes introducir 180 000 de principal, 3,5 % anual y 25 años, y anotar la frecuencia de pago. Usa la misma moneda y confirma si el campo espera 3,5 o 0,035.', 'El tipo, el plazo, la frecuencia y el capital deben proceder de la misma oferta. Una tasa fija no se interpreta igual que una variable, y una cuota de capital e intereses no equivale al coste total de la vivienda.'] },
        { heading: 'Interpretar la cuota mensual', paragraphs: ['Compara la cuota con el capital total y observa que los intereses acumulados pueden superar la diferencia que se aprecia en una sola mensualidad. Guarda los supuestos junto con el resultado para que otra persona pueda reproducirlo.', 'La salida no incluye automáticamente seguros, impuestos, comisiones, gastos de cierre, cambios de tipo ni penalizaciones. No uses una cuota estimada como aprobación de crédito; verifica el cuadro de amortización y las condiciones oficiales del prestamista.'] },
      ],
      examples: ['Comparar dos plazos para el mismo principal y tipo nominal.', 'Usar una cuota estimada como punto de partida antes de revisar una oferta bancaria.'],
      notes: ['El formato decimal y la moneda deben quedar documentados.', 'Una cuota más baja por ampliar el plazo puede aumentar el interés total.'],
    },
  },
  fr: {
    'grade-average': {
      contentSections: [
        { heading: 'Préparer les notes et les coefficients', paragraphs: ['Saisissez une note par ligne et ajoutez un coefficient lorsque la matière compte davantage. Par exemple, 14 avec coefficient 2 et 16 avec coefficient 1 donnent une moyenne pondérée de 14,67 ; vérifiez d’abord que les notes utilisent le même barème.', 'Laissez les coefficients facultatifs seulement lorsqu’une moyenne simple est réellement demandée. Une note sur 20 et une note sur 100 ne doivent pas être mélangées sans conversion documentée.'] },
        { heading: 'Vérifier la moyenne affichée', paragraphs: ['Comparez la somme, l’effectif et la moyenne pondérée au calcul manuel : somme des notes multipliées par leur coefficient, divisée par la somme des coefficients. Contrôlez aussi la moyenne simple si les deux sorties sont disponibles.', 'Un coefficient nul, une ligne incomplète ou un barème différent peut rendre le résultat trompeur. Le calculateur ne connaît pas les règles de compensation, de rattrapage ou d’arrondi de votre établissement ; vérifiez le règlement avant de communiquer une note finale.'] },
      ],
      examples: ['Comparer 14 coefficient 2 et 16 coefficient 1 sur un même barème.', 'Vérifier une moyenne de bulletin avec les coefficients du règlement.'],
      notes: ['Documentez le barème et la règle d’arrondi.', 'La moyenne calculée ne remplace pas la décision administrative de l’établissement.'],
    },
    inflation: {
      contentSections: [
        { heading: 'Définir la période et l’indice', paragraphs: ['Pour une vérification simple, comparez un indice de 100 à 106 et notez la période, le pays et la série utilisée. Une hausse de 6 % de l’indice ne signifie pas que chaque article a augmenté exactement de 6 %.', 'Utilisez des valeurs appartenant à la même série et à la même base. Si vous comparez un salaire, un loyer ou un panier, précisez s’il s’agit d’un montant nominal ou d’un montant corrigé par l’indice.'] },
        { heading: 'Interpréter pouvoir d’achat et limites', paragraphs: ['Le résultat indique une variation arithmétique entre deux niveaux d’indice ou de prix. Il peut servir à contrôler une feuille de calcul, mais il ne choisit pas le panier, la pondération ni la période pertinente pour votre situation.', 'Les dépenses individuelles, les salaires, les taxes et les loyers peuvent évoluer autrement que l’indice général. Pour une clause contractuelle ou une décision financière, utilisez la série officielle et la méthode prévue par le document concerné.'] },
      ],
      examples: ['Contrôler une hausse d’indice de 100 à 106 sur une période précisée.', 'Comparer une revalorisation avec l’indice officiel prévu au contrat.'],
      notes: ['Une variation moyenne ne décrit pas chaque prix.', 'Conservez la source, la base et les dates avec le résultat.'],
    },
    'business-days': {
      contentSections: [
        { heading: 'Fixer les règles du délai', paragraphs: ['Saisissez les dates et décidez si le premier et le dernier jour sont inclus. Du lundi 5 janvier 2026 au vendredi 9 janvier 2026, cinq jours ouvrés sont comptés si seuls les samedis et dimanches sont exclus.', 'Vérifiez le format de date et le fuseau de l’équipe. Un contrat, une administration ou une entreprise peut appliquer un calendrier de jours fériés différent du simple calendrier hebdomadaire.'] },
        { heading: 'Contrôler le résultat avant de le communiquer', paragraphs: ['Testez un intervalle d’une semaine en listant les jours retenus. Lorsqu’un délai traverse un week-end, cette liste explique la différence entre une soustraction de dates et un décompte de jours ouvrés.', 'L’outil ne connaît pas automatiquement tous les jours fériés locaux. Pour une paie, une livraison contractuelle ou une échéance légale, comparez le résultat au calendrier officiel et notez la convention utilisée.'] },
      ],
      examples: ['Vérifier un délai du lundi au vendredi sans jour férié ajouté.', 'Contrôler une échéance qui traverse un week-end avant d’envoyer un avis.'],
      notes: ['Jours calendaires et jours ouvrés répondent à des questions différentes.', 'Les jours fériés doivent venir d’une liste ou d’une source explicite.'],
    },
    'weighted-average-calculator': {
      contentSections: [
        { heading: 'Construire une moyenne pondérée claire', paragraphs: ['Saisissez une valeur et son poids sur chaque ligne. Avec 12 coefficient 2 et 16 coefficient 1, la moyenne pondérée vaut 13,33 ; le résultat donne plus d’influence à la première valeur parce que son coefficient est doublé.', 'Les valeurs doivent être comparables et les poids représenter la règle réelle. Notez si les poids sont des coefficients bruts, des crédits, des volumes ou des proportions déjà normalisées.'] },
        { heading: 'Lire la sortie et détecter les erreurs', paragraphs: ['Vérifiez la somme des produits et la somme des poids avant de copier la moyenne. Comparez-la à la moyenne simple pour voir l’effet de la pondération, puis contrôlez qu’une ligne vide ou un coefficient nul n’a pas été interprété comme une observation valide.', 'Une moyenne pondérée ne corrige pas des unités incompatibles, des poids inversés ou une sélection biaisée. Pour une note, un prix ou un indicateur officiel, appliquez ensuite la règle d’arrondi et les exclusions prévues par la source.'] },
      ],
      examples: ['Comparer 12 avec poids 2 et 16 avec poids 1.', 'Vérifier une note pondérée à partir de crédits ou de coefficients documentés.'],
      notes: ['Un poids nul ne donne pas automatiquement une information utile.', 'Conservez la somme des poids et la règle d’arrondi avec le résultat.'],
    },
    'date-difference': {
      contentSections: [
        { heading: 'Choisir l’unité et la convention', paragraphs: ['Saisissez deux dates et décidez si vous cherchez des jours écoulés, une durée de calendrier ou une différence entre années, mois et jours. Par exemple, du 15 janvier au 1er mars 2026 ne doit pas être résumé de la même manière selon que les bornes sont incluses.', 'Vérifiez l’ordre des dates et le format utilisé par votre équipe. Pour une échéance, indiquez clairement la date de départ, la date finale, le fuseau et la convention de comptage.'] },
        { heading: 'Contrôler les cas de bord', paragraphs: ['Testez une paire de dates connue, puis regardez séparément le total de jours et la décomposition affichée. Les mois n’ont pas tous la même longueur et les années bissextiles changent certains intervalles.', 'Un résultat exact en jours ne décide pas à lui seul d’un délai juridique, d’une ancienneté ou d’une facturation. Comparez la convention du calculateur avec le document officiel et conservez l’entrée originale avec le résultat.'] },
      ],
      examples: ['Contrôler l’intervalle du 15 janvier au 1er mars 2026 en jours.', 'Comparer une durée de calendrier avec une échéance qui exclut le jour de départ.'],
      notes: ['Les bornes incluses ou exclues doivent être écrites dans le compte rendu.', 'Les mois et années ne se convertissent pas toujours en un nombre fixe de jours.'],
    },
  },
};

export function mergePhase2BContent(base: ToolContent, addition?: Phase2BTreatmentContent): ToolContent {
  if (!addition) return base;
  return {
    ...base,
    contentSections: [...(base.contentSections ?? []), ...addition.contentSections],
    examples: [...base.examples, ...(addition.examples ?? [])],
    notes: [...(base.notes ?? []), ...(addition.notes ?? [])],
  };
}
