import ItemCard from "@/src/components/shared/ItemCard";

interface ItemProps {
  name: string;
  onClick: () => void;
}

export default function Item({ name, onClick }: ItemProps) {
  return (
    <ItemCard
      name={name}
      imageSize={136}
      width={160}
      height={197}
      onClick={onClick}
    />
  );
}
