import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import useWobbStore from "@/store/useWobbStore";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, ArrowRight } from "lucide-react";
import type { Platform, UserProfileSummary } from "@/types";

interface SortableItemProps {
  profile: UserProfileSummary & { platform: Platform };
  onRemove: (username: string) => void;
}

function SortableItem({ profile, onRemove }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: profile.username });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-4 p-4 mb-3 glass-card group transition-colors ${
        isDragging ? "shadow-xl border-primary-500/50 scale-[1.02]" : "hover:border-slate-300"
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-2 text-slate-300 hover:text-slate-500 transition-colors"
      >
        <GripVertical size={20} />
      </div>
      
      <img
        src={profile.picture || `https://ui-avatars.com/api/?name=${profile.username || profile.handle}&background=random`}
        className="w-12 h-12 rounded-full object-cover shadow-sm"
        onError={(e) => {
          e.currentTarget.src = `https://ui-avatars.com/api/?name=${profile.username || profile.handle}&background=random`;
        }}
      />
      
      <div className="flex-1 min-w-0">
        <Link
          to={`/profile/${profile.username}?platform=${profile.platform}`}
          className="font-bold text-slate-800 hover:text-primary-600 transition-colors flex items-center gap-1 text-lg"
        >
          {profile.fullname || profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </Link>
        <div className="flex items-center gap-2 mt-0.5">
          <p className="text-sm text-slate-500 font-medium truncate">@{profile.username || profile.handle}</p>
          {profile.url && (
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-medium transition-colors"
            >
              Visit ↗
            </a>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
            {formatFollowers(profile.followers)} followers
          </span>
          <span className="text-xs font-semibold bg-primary-50 text-primary-600 px-2 py-0.5 rounded capitalize">
            {profile.platform}
          </span>
        </div>
      </div>
      
      <button
        onClick={() => onRemove(profile.username)}
        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
        title="Remove"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

export function ListPage() {
  const { selectedList, removeFromList, reorderList } = useWobbStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderList(active.id as string, over.id as string);
    }
  };

  return (
    <Layout title="Campaign Roster">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">My Creator List</h1>
            <p className="text-slate-500 font-medium mt-1">
              {selectedList.length === 0
                ? "No creators added yet"
                : `${selectedList.length} creator${selectedList.length > 1 ? "s" : ""} selected for campaign`}
            </p>
          </div>
          {selectedList.length > 0 && (
            <button
              onClick={() => selectedList.forEach((p) => removeFromList(p.username))}
              className="text-sm font-bold text-red-400 hover:text-red-600 px-4 py-2 hover:bg-red-50 rounded-full transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {selectedList.length === 0 ? (
          <div className="text-center py-24 glass-card border-dashed">
            <div className="text-5xl mb-4 opacity-50">📋</div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">Your list is empty</h3>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">
              Add creators from the search page to build your campaign roster.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all"
            >
              Browse Influencers
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={selectedList.map(p => p.username)}
                  strategy={verticalListSortingStrategy}
                >
                  {selectedList.map((profile) => (
                    <SortableItem
                      key={profile.username}
                      profile={profile}
                      onRemove={removeFromList}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </div>

            <div className="flex justify-center pt-8 border-t border-slate-200">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 bg-primary-50 px-6 py-3 rounded-full transition-colors"
              >
                <PlusIcon size={18} />
                Add more creators
              </Link>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

function PlusIcon({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}