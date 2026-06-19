import AgeCalculator from '../components/tools/AgeCalculator.astro';
import Base64Tool from '../components/tools/Base64Tool.astro';
import BreakReminder from '../components/tools/BreakReminder.astro';
import BusinessDays from '../components/tools/BusinessDays.astro';
import Cad2dBoard from '../components/tools/Cad2dBoard.astro';
import CaseConverter from '../components/tools/CaseConverter.astro';
import CharacterCounter from '../components/tools/CharacterCounter.astro';
import ClassGroupGenerator from '../components/tools/ClassGroupGenerator.astro';
import ColorGenerator from '../components/tools/ColorGenerator.astro';
import CompoundInterest from '../components/tools/CompoundInterest.astro';
import CountdownTimer from '../components/tools/CountdownTimer.astro';
import DateDifference from '../components/tools/DateDifference.astro';
import DeletePdfPages from '../components/tools/DeletePdfPages.astro';
import DiceRoller from '../components/tools/DiceRoller.astro';
import ExtractPdfPages from '../components/tools/ExtractPdfPages.astro';
import FlowchartMaker from '../components/tools/FlowchartMaker.astro';
import GpaCalculator from '../components/tools/GpaCalculator.astro';
import GradeAverage from '../components/tools/GradeAverage.astro';
import EducationStatisticsCalculator from '../components/tools/EducationStatisticsCalculator.astro';
import ImageCompressor from '../components/tools/ImageCompressor.astro';
import ImageResizer from '../components/tools/ImageResizer.astro';
import ImagesToPdf from '../components/tools/ImagesToPdf.astro';
import InflationCalculator from '../components/tools/InflationCalculator.astro';
import JpgToPng from '../components/tools/JpgToPng.astro';
import JsonFormatter from '../components/tools/JsonFormatter.astro';
import DataConverter from '../components/tools/DataConverter.astro';
import ImageFormatConverter from '../components/tools/ImageFormatConverter.astro';
import MarkdownPreviewer from '../components/tools/MarkdownPreviewer.astro';
import PdfCompressor from '../components/tools/PdfCompressor.astro';
import PdfPageReorder from '../components/tools/PdfPageReorder.astro';
import PdfToImage from '../components/tools/PdfToImage.astro';
import TimestampConverter from '../components/tools/TimestampConverter.astro';
import UuidGenerator from '../components/tools/UuidGenerator.astro';
import MergePdf from '../components/tools/MergePdf.astro';
import MortgagePayment from '../components/tools/MortgagePayment.astro';
import NetSalary from '../components/tools/NetSalary.astro';
import OvertimePay from '../components/tools/OvertimePay.astro';
import PasswordGenerator from '../components/tools/PasswordGenerator.astro';
import PomodoroTimer from '../components/tools/PomodoroTimer.astro';
import PngToJpg from '../components/tools/PngToJpg.astro';
import QrCodeGenerator from '../components/tools/QrCodeGenerator.astro';
import RandomGroupGenerator from '../components/tools/RandomGroupGenerator.astro';
import RandomNamePicker from '../components/tools/RandomNamePicker.astro';
import RandomNumberPicker from '../components/tools/RandomNumberPicker.astro';
import RandomStudentPicker from '../components/tools/RandomStudentPicker.astro';
import RandomWheel from '../components/tools/RandomWheel.astro';
import RemoveDuplicateLines from '../components/tools/RemoveDuplicateLines.astro';
import RemoveEmptyLines from '../components/tools/RemoveEmptyLines.astro';
import RotatePdf from '../components/tools/RotatePdf.astro';
import SavingsGoal from '../components/tools/SavingsGoal.astro';
import SeatingChart from '../components/tools/SeatingChart.astro';
import Sketchpad from '../components/tools/Sketchpad.astro';
import SortLines from '../components/tools/SortLines.astro';
import SplitPdf from '../components/tools/SplitPdf.astro';
import Stopwatch from '../components/tools/Stopwatch.astro';
import ThisOrThat from '../components/tools/ThisOrThat.astro';
import UrlEncoder from '../components/tools/UrlEncoder.astro';
import WhatToEat from '../components/tools/WhatToEat.astro';
import WordCounter from '../components/tools/WordCounter.astro';

export const widgetBySlug = {
  'random-number-picker': RandomNumberPicker,
  'pomodoro-timer': PomodoroTimer,
  'word-counter': WordCounter,
  'random-name-picker': RandomNamePicker,
  'random-group-generator': RandomGroupGenerator,
  'countdown-timer': CountdownTimer,
  'date-difference': DateDifference,
  'age-calculator': AgeCalculator,
  'business-days': BusinessDays,
  'break-reminder': BreakReminder,
  'case-converter': CaseConverter,
  'remove-empty-lines': RemoveEmptyLines,
  'remove-duplicate-lines': RemoveDuplicateLines,
  'sort-lines': SortLines,
  'qr-code-generator': QrCodeGenerator,
  'password-generator': PasswordGenerator,
  'color-generator': ColorGenerator,
  'dice-roller': DiceRoller,
  stopwatch: Stopwatch,
  base64: Base64Tool,
  'url-encoder': UrlEncoder,
  'json-formatter': JsonFormatter,
  'random-student-picker': RandomStudentPicker,
  'grade-average': GradeAverage,
  'percentile-rank-calculator': EducationStatisticsCalculator,
  'z-score-calculator': EducationStatisticsCalculator,
  't-score-calculator': EducationStatisticsCalculator,
  'weighted-average-calculator': EducationStatisticsCalculator,
  'class-rank-percentile-calculator': EducationStatisticsCalculator,
  'normalized-score-converter': EducationStatisticsCalculator,
  'teacher-exam-score-converter': EducationStatisticsCalculator,
  'cronbach-alpha-calculator': EducationStatisticsCalculator,
  'independent-samples-t-test-calculator': EducationStatisticsCalculator,
  'gpa-calculator': GpaCalculator,
  'random-wheel': RandomWheel,
  'what-to-eat': WhatToEat,
  'this-or-that': ThisOrThat,
  'compound-interest': CompoundInterest,
  'savings-goal': SavingsGoal,
  'mortgage-payment': MortgagePayment,
  'net-salary': NetSalary,
  'overtime-pay': OvertimePay,
  inflation: InflationCalculator,
  'character-counter': CharacterCounter,
  'image-compressor': ImageCompressor,
  'image-resizer': ImageResizer,
  'png-to-jpg': PngToJpg,
  'jpg-to-png': JpgToPng,
  'merge-pdf': MergePdf,
  'split-pdf': SplitPdf,
  'images-to-pdf': ImagesToPdf,
  'rotate-pdf': RotatePdf,
  'delete-pdf-pages': DeletePdfPages,
  'extract-pdf-pages': ExtractPdfPages,
  'cad-2d': Cad2dBoard,
  sketchpad: Sketchpad,
  flowchart: FlowchartMaker,
  'seating-chart': SeatingChart,
  'group-generator': ClassGroupGenerator,
  'timestamp-converter': TimestampConverter,
  'uuid-generator': UuidGenerator,
  'csv-to-json': DataConverter,
  'json-to-csv': DataConverter,
  'markdown-previewer': MarkdownPreviewer,
  'jpg-to-webp': ImageFormatConverter,
  'webp-to-jpg': ImageFormatConverter,
  'pdf-page-reorder': PdfPageReorder,
  'pdf-to-image': PdfToImage,
  'pdf-compressor': PdfCompressor,
} as const;

export type ToolWidgetSlug = keyof typeof widgetBySlug;

export function getToolWidget(slug: string) {
  return widgetBySlug[slug as ToolWidgetSlug];
}
