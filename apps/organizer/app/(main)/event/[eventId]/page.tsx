type Props = {
  params: { eventId: string };
};

export default function EventPage({ params }: Props) {
  const { eventId } = params;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Event</h1>
      <p className="mt-4">Event ID: <strong>{eventId}</strong></p>
    </div>
  );
}
