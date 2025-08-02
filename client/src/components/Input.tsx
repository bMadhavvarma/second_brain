interface InputProps {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
  }
  
  const Input = ({ label, placeholder, value, onChange }: InputProps) => {
    return (
      <div className="mb-4">
        <label className="block font-medium mb-1">{label}</label>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    );
  };
  
  export default Input;
  