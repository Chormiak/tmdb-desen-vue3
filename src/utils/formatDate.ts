export default function (date: `${number}-${number}-${number}`): string {
  return new Date(date).toLocaleDateString('pt-BR');
}
